import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Mock auth — replace with Firebase Auth in production
const MOCK_USERS = {
  'admin@pulsesa.co.za': { id: 'admin-1', name: 'Admin User', email: 'admin@pulsesa.co.za', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=FF4D6D&color=fff' },
  'user@pulsesa.co.za': { id: 'user-1', name: 'Thabo Nkosi', email: 'user@pulsesa.co.za', role: 'user', avatar: 'https://ui-avatars.com/api/?name=Thabo+Nkosi&background=7C5CFF&color=fff' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('pulse-user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_USERS[email];
    if (!found || password.length < 4) throw new Error('Invalid credentials');
    setUser(found);
    localStorage.setItem('pulse-user', JSON.stringify(found));
    return found;
  }, []);

  const register = useCallback(async (name, email, password) => {
    await new Promise(r => setTimeout(r, 800));
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF4D6D&color=fff`,
    };
    setUser(newUser);
    localStorage.setItem('pulse-user', JSON.stringify(newUser));
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('pulse-user');
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
