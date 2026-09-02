import {
  doc, setDoc, deleteDoc, getDoc, collection, query, where, getDocs, serverTimestamp, writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const interestService = {
  // Toggle interest on/off for a user+event
  async toggle(userId, eventId) {
    const ref = doc(db, 'interests', `${userId}_${eventId}`);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await deleteDoc(ref);
      return false;
    }
    await setDoc(ref, { userId, eventId, createdAt: serverTimestamp() });
    return true;
  },

  async isInterested(userId, eventId) {
    const snap = await getDoc(doc(db, 'interests', `${userId}_${eventId}`));
    return snap.exists();
  },

  // Get all eventIds a user is interested in
  async getUserInterests(userId) {
    const q = query(collection(db, 'interests'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data().eventId);
  },

  // Get count of interested users for an event
  async getEventInterestCount(eventId) {
    const q = query(collection(db, 'interests'), where('eventId', '==', eventId));
    const snap = await getDocs(q);
    return snap.size;
  },

  // Delete all interests for a passed event
  async clearEventInterests(eventId) {
    const q = query(collection(db, 'interests'), where('eventId', '==', eventId));
    const snap = await getDocs(q);
    if (snap.empty) return 0;
    const batch = writeBatch(db);
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    return snap.size;
  },
};
