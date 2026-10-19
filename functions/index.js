const { onSchedule } = require('firebase-functions/v2/scheduler');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldPath } = require('firebase-admin/firestore');

initializeApp();

/**
 * Determines the expiry timestamp for an event.
 * Uses endTime on the event date if available, otherwise end of the start date.
 * Returns null if the event has no date (never expires automatically).
 */
function getExpiryDate(event) {
  const dateStr = event.date;
  if (!dateStr) return null;

  const base = new Date(dateStr);
  if (isNaN(base.getTime())) return null;

  if (event.endTime) {
    const [h, m] = event.endTime.split(':').map(Number);
    base.setHours(h, m, 0, 0);
  } else {
    // No end time — expire at end of the start date
    base.setHours(23, 59, 59, 999);
  }
  return base;
}

/**
 * Scheduled Cloud Function — runs every hour.
 * Deletes expired events and all their associated interests/bookmarks.
 *
 * Recurring events: events with `isRecurring: true` are skipped entirely;
 * the frontend/admin is responsible for updating their next occurrence date.
 */
exports.purgeExpiredEvents = onSchedule(
  { schedule: 'every 60 minutes', timeZone: 'Africa/Johannesburg', region: 'europe-west1' },
  async () => {
    const db = getFirestore();
    const now = new Date();

    const eventsSnap = await db.collection('events').get();
    if (eventsSnap.empty) return;

    const expired = eventsSnap.docs.filter(doc => {
      const data = doc.data();
      // Never auto-delete recurring events
      if (data.isRecurring) return false;
      const expiry = getExpiryDate(data);
      return expiry !== null && expiry < now;
    });

    if (expired.length === 0) return;

    // Process in batches of 500 (Firestore batch limit)
    const BATCH_SIZE = 500;

    for (let i = 0; i < expired.length; i += BATCH_SIZE) {
      const chunk = expired.slice(i, i + BATCH_SIZE);
      const eventIds = chunk.map(d => d.id);

      // 1. Delete the event documents
      const eventBatch = db.batch();
      chunk.forEach(d => eventBatch.delete(d.ref));
      await eventBatch.commit();

      // 2. Delete all interests referencing these events
      // Firestore 'in' queries support up to 30 values per query
      for (let j = 0; j < eventIds.length; j += 30) {
        const idSlice = eventIds.slice(j, j + 30);
        const interestsSnap = await db
          .collection('interests')
          .where('eventId', 'in', idSlice)
          .get();

        if (!interestsSnap.empty) {
          const interestBatch = db.batch();
          interestsSnap.docs.forEach(d => interestBatch.delete(d.ref));
          await interestBatch.commit();
        }
      }

      // 3. Remove expired event IDs from all users' bookmarks arrays
      for (let j = 0; j < eventIds.length; j += 30) {
        const idSlice = eventIds.slice(j, j + 30);
        // Find users who have any of these event IDs bookmarked
        const usersSnap = await db
          .collection('users')
          .where('bookmarks', 'array-contains-any', idSlice)
          .get();

        if (!usersSnap.empty) {
          const userBatch = db.batch();
          usersSnap.docs.forEach(userDoc => {
            const bookmarks = userDoc.data().bookmarks || [];
            const updated = bookmarks.filter(id => !idSlice.includes(id));
            userBatch.update(userDoc.ref, { bookmarks: updated });
          });
          await userBatch.commit();
        }
      }
    }

    console.log(`Purged ${expired.length} expired event(s).`);
  }
);
