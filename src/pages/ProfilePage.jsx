import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdBookmark, MdFavorite, MdHistory, MdSettings,
  MdNotifications, MdSecurity, MdPayment, MdEdit, MdLogout,
} from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import EventCard from '../components/cards/EventCard';
import Tabs from '../components/common/Tabs';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useInterests } from '../contexts/InterestContext';
import { useTheme } from '../contexts/ThemeContext';
import { eventService } from '../services/eventService';

const getInitials = (name = '') =>
  name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

const TABS = [
  { id: 'saved', label: 'Saved', icon: <MdBookmark size={16} /> },
  { id: 'interests', label: 'Interests', icon: <MdFavorite size={16} /> },
  { id: 'history', label: 'History', icon: <MdHistory size={16} /> },
  { id: 'settings', label: 'Settings', icon: <MdSettings size={16} /> },
];

const SettingsPanel = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-4 max-w-lg">
      {[
        { icon: MdNotifications, label: 'Notifications', desc: 'Manage push and email notifications' },
        { icon: MdSecurity, label: 'Security', desc: 'Password and two-factor authentication' },
        { icon: MdPayment, label: 'Payment Methods', desc: 'Manage your saved payment methods' },
      ].map(({ icon: Icon, label, desc }) => (
        <button key={label} className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left">
          <div className="w-10 h-10 rounded-xl bg-[#FF4D6D]/15 flex items-center justify-center">
            <Icon size={20} className="text-[#FF4D6D]" />
          </div>
          <div>
            <p className="font-medium text-white">{label}</p>
            <p className="text-sm text-[#B6BDC9]">{desc}</p>
          </div>
        </button>
      ))}

      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
        <div>
          <p className="font-medium text-white">Dark Mode</p>
          <p className="text-sm text-[#B6BDC9]">Toggle between dark and light theme</p>
        </div>
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-[#FF4D6D]' : 'bg-white/20'}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDark ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>

      <button
        onClick={() => { logout(); navigate('/'); }}
        className="w-full flex items-center gap-3 p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-2xl text-[#EF4444] hover:bg-[#EF4444]/20 transition-all"
      >
        <MdLogout size={20} /> Sign Out
      </button>
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();
  const { interests } = useInterests();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('saved');
  const [savedEvents, setSavedEvents] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingEvents(true);
    const ids = [...new Set([...bookmarks, ...interests])];
    if (!ids.length) { setLoadingEvents(false); return; }
    eventService.getByIds(ids).then(events => {
      setSavedEvents(events.filter(e => bookmarks.includes(e.id)));
      setInterestedEvents(events.filter(e => interests.includes(e.id)));
    }).finally(() => setLoadingEvents(false));
  }, [user, bookmarks, interests]);

  if (!user) {
    return (
      <MainLayout>
        <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-20 text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-white mb-3">Sign in to view your profile</h2>
          <p className="text-[#B6BDC9] mb-6">Access your saved events, interests, and settings.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login"><Button variant="primary">Sign In</Button></Link>
            <Link to="/register"><Button variant="secondary">Create Account</Button></Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const tabContent = {
    saved: loadingEvents ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1,2,3].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl skeleton" />)}
      </div>
    ) : savedEvents.length === 0 ? (
      <EmptyState type="events" title="No saved events" message="Bookmark events to save them here." action={() => navigate('/events')} actionLabel="Browse Events" />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {savedEvents.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
      </div>
    ),

    interests: loadingEvents ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1,2,3].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl skeleton" />)}
      </div>
    ) : interestedEvents.length === 0 ? (
      <EmptyState type="events" title="No interested events" message="Mark events you're interested in attending." action={() => navigate('/events')} actionLabel="Browse Events" />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {interestedEvents.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
      </div>
    ),

    history: (
      <EmptyState type="events" title="No attendance history" message="Events you attend will appear here." action={() => navigate('/events')} actionLabel="Browse Events" />
    ),

    settings: <SettingsPanel />,
  };

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-[#FF4D6D]/20 via-[#7C5CFF]/10 to-transparent border border-white/10 rounded-3xl p-6 md:p-8 mb-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D6D]/5 to-[#7C5CFF]/5" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF4D6D] to-[#7C5CFF] flex items-center justify-center border-2 border-white/20 flex-shrink-0">
              <span className="text-white font-bold text-2xl">{getInitials(user.name)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                {user.role === 'admin' && <span className="px-2 py-0.5 bg-[#FF4D6D]/20 text-[#FF4D6D] text-xs rounded-full border border-[#FF4D6D]/30">Admin</span>}
              </div>
              <p className="text-[#B6BDC9]">{user.email}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-[#B6BDC9]">
                <span><strong className="text-white font-mono">{bookmarks.length}</strong> saved</span>
                <span><strong className="text-white font-mono">{interests.length}</strong> interested</span>
              </div>
            </div>
            <Button variant="secondary" size="sm" icon={<MdEdit size={16} />}>Edit Profile</Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <Tabs
            tabs={TABS.map(t => ({
              ...t,
              count: t.id === 'saved' ? bookmarks.length : t.id === 'interests' ? interests.length : undefined,
            }))}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
