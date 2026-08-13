import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { interestService } from '../services/interestService';
import { useAuth } from './AuthContext';

const InterestContext = createContext();

export const InterestProvider = ({ children }) => {
  const { user } = useAuth();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setInterests([]); return; }
    setLoading(true);
    interestService.getUserInterests(user.id)
      .then(setInterests)
      .catch(() => setInterests([]))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const toggle = useCallback(async (eventId) => {
    if (!user) return false;
    const nowInterested = await interestService.toggle(user.id, eventId);
    setInterests(prev =>
      nowInterested ? [...prev, eventId] : prev.filter(id => id !== eventId)
    );
    return nowInterested;
  }, [user]);

  const isInterested = useCallback((eventId) => interests.includes(eventId), [interests]);

  return (
    <InterestContext.Provider value={{ interests, loading, toggle, isInterested }}>
      {children}
    </InterestContext.Provider>
  );
};

export const useInterests = () => {
  const ctx = useContext(InterestContext);
  if (!ctx) throw new Error('useInterests must be used within InterestProvider');
  return ctx;
};
