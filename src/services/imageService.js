import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

export const imageService = {
  async uploadEventImage(file, eventId) {
    const ext = file.name.split('.').pop();
    const path = `events/${eventId || Date.now()}.${ext}`;
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  },

  async deleteEventImage(imageUrl) {
    try {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch {
      // Ignore if file doesn't exist
    }
  },
};
