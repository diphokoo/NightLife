import { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
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
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

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
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
