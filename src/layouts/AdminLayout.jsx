import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard, MdEvent, MdPeople, MdBarChart, MdLocationOn,
  MdMenu, MdLogout, MdNotifications, MdLightMode, MdDarkMode,
  MdConfirmationNumber,
} from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.png';

const adminLinks = [
  { to: '/admin', icon: MdDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/events', icon: MdEvent, label: 'Events' },
  { to: '/admin/analytics', icon: MdBarChart, label: 'Analytics' },
  { to: '/admin/venues', icon: MdLocationOn, label: 'Venues' },
  { to: '/admin/users', icon: MdPeople, label: 'Users' },
  { to: '/admin/tickets', icon: MdConfirmationNumber, label: 'Tickets' },
];

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="NightIQ" className="w-8 h-8 rounded-xl object-contain" />
          <div>
            <span className="font-display font-bold text-white text-base">Night<span className="text-[#FF4D6D]">IQ</span></span>
            <p className="text-[10px] text-[#B6BDC9]">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {adminLinks.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#FF4D6D]/15 text-[#FF4D6D] border border-[#FF4D6D]/20'
                  : 'text-[#B6BDC9] hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
        >
          {isDark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#EF4444] hover:bg-white/10 transition-all"
        >
          <MdLogout size={18} /> Sign Out
        </button>
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mt-2">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-[#B6BDC9] truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0F172A] border-r border-white/10 fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-[#0F172A] border-r border-white/10 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#111827]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
            aria-label="Open menu"
          >
            <MdMenu size={22} />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all">
              <MdNotifications size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF4D6D] rounded-full" />
            </button>
            <Link to="/" className="text-sm text-[#B6BDC9] hover:text-white transition-colors px-3 py-1.5 rounded-xl hover:bg-white/10">
              ← Back to Site
            </Link>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
