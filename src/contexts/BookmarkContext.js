import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const BookmarkContext = createContext();

const LOCAL_KEY = 'pulse-bookmarks';

export const BookmarkProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch { return []; }
  });

  // Load bookmarks from Firestore when user logs in
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'users', user.id)).then(snap => {
      if (snap.exists()) {
        const saved = snap.data().bookmarks || [];
        setBookmarks(saved);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(saved));
      }
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const persist = useCallback(async (next, uid) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    if (uid) {
      await setDoc(doc(db, 'users', uid), { bookmarks: next }, { merge: true }).catch(() => {});
    }
  }, []);

  const toggle = useCallback((eventId) => {
    setBookmarks(prev => {
      const next = prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId];
      persist(next, user?.id);
      return next;
    });
  }, [user?.id, persist]);

  const isBookmarked = useCallback((eventId) => bookmarks.includes(eventId), [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggle, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider');
  return ctx;
};
