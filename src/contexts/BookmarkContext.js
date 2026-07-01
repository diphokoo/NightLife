import { createContext, useContext, useState, useCallback } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pulse-bookmarks') || '[]');
    } catch { return []; }
  });

  const toggle = useCallback((eventId) => {
    setBookmarks(prev => {
      const next = prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId];
      localStorage.setItem('pulse-bookmarks', JSON.stringify(next));
      return next;
    });
  }, []);

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
