import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

const isFirestoreOfflineError = (error) =>
  error?.code === 'unavailable' ||
  error?.message?.includes('client is offline') ||
  error?.message?.includes('Could not reach Cloud Firestore backend') ||
  error?.message?.includes('Failed to get document because the client is offline');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(null);
  const handlingOfflineRef = useRef(false);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setLoading(false);
  }, []);

  const handleOfflineError = useCallback(async () => {
    if (handlingOfflineRef.current) return;
    handlingOfflineRef.current = true;
    try {
      await signOut(auth);
    } catch {
      // ignore signOut errors
    }
    clearAuthState();
    setConnectionError('Your session could not be verified because of a connection issue. Please sign in again.');
    handlingOfflineRef.current = false;
  }, [clearAuthState]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
          const profile = snap.exists() ? snap.data() : {};
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: profile.name || firebaseUser.displayName || '',
            role: profile.role || 'user',
            avatar: profile.avatar || firebaseUser.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || firebaseUser.email)}&background=FF4D6D&color=fff`,
            ...profile,
          });
          setLoading(false);
        } catch (error) {
          if (isFirestoreOfflineError(error)) {
            await handleOfflineError();
          } else {
            // Non-connection error (e.g. permission) — still set loading false, keep user signed in
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || '',
              role: 'user',
              avatar: firebaseUser.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.email)}&background=FF4D6D&color=fff`,
            });
            setLoading(false);
          }
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsub;
  }, [handleOfflineError]);

  const login = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, 'users', cred.user.uid));
    const profile = snap.exists() ? snap.data() : {};
    return { role: profile.role || 'user', ...profile };
  }, []);

  const register = useCallback(async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF4D6D&color=fff`;
    const profile = { name, email, role: 'user', avatar, createdAt: serverTimestamp() };
    await setDoc(doc(db, 'users', cred.user.uid), profile);
    return profile;
  }, []);

  const logout = useCallback(() => signOut(auth), []);

  const updateUserProfile = useCallback(async (data) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.id), data, { merge: true });
    setUser(prev => ({ ...prev, ...data }));
  }, [user]);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, updateUserProfile, connectionError, clearConnectionError: () => setConnectionError(null) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
