import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdNotifications, MdPerson, MdMenu, MdClose, MdDarkMode, MdLightMode,
  MdConfirmationNumber, MdSearch, MdKeyboardArrowDown, MdLogout, MdDashboard,
} from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../common/SearchBar';
import { SA_CITIES, EVENT_CATEGORIES } from '../../constants';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { to: '/events', label: 'Events' },
    { to: '/tickets', label: 'Tickets' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#111827]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="content-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF4D6D] to-[#7C5CFF] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(255,77,109,0.5)] transition-shadow">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-display font-bold text-white text-lg hidden sm:block">
                Pulse <span className="text-[#FF4D6D]">SA</span>
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-md mx-4">
              <SearchBar className="w-full" />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 flex-shrink-0">
              {/* Cities dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setCitiesOpen(true)}
                  onMouseLeave={() => setCitiesOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
                >
                  Cities <MdKeyboardArrowDown size={16} className={`transition-transform ${citiesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {citiesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      onMouseEnter={() => setCitiesOpen(true)}
                      onMouseLeave={() => setCitiesOpen(false)}
                      className="absolute top-full left-0 mt-1 w-48 bg-[#121826] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                    >
                      {SA_CITIES.slice(0, 8).map(city => (
                        <button
                          key={city}
                          onClick={() => { navigate(`/events?city=${city}`); setCitiesOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm text-[#B6BDC9] hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Categories dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setCatsOpen(true)}
                  onMouseLeave={() => setCatsOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
                >
                  Categories <MdKeyboardArrowDown size={16} className={`transition-transform ${catsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {catsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      onMouseEnter={() => setCatsOpen(true)}
                      onMouseLeave={() => setCatsOpen(false)}
                      className="absolute top-full left-0 mt-1 w-52 bg-[#121826] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                    >
                      {EVENT_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => { navigate(`/events?category=${cat.id}`); setCatsOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm text-[#B6BDC9] hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2"
                        >
                          <span>{cat.icon}</span> {cat.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-sm transition-all ${isActive ? 'text-white bg-white/10' : 'text-[#B6BDC9] hover:text-white hover:bg-white/10'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto flex-shrink-0">
              {/* Mobile search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 rounded-xl text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
                aria-label="Search"
              >
                <MdSearch size={22} />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
              </button>

              {user ? (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 rounded-xl text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all" aria-label="Notifications">
                    <MdNotifications size={22} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF4D6D] rounded-full" />
                  </button>

                  {/* Profile */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(p => !p)}
                      className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/10 transition-all"
                      aria-label="Profile menu"
                    >
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover" />
                    </button>
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -8 }}
                          className="absolute right-0 top-full mt-2 w-52 bg-[#121826] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                        >
                          <div className="px-3 py-2 border-b border-white/10 mb-1">
                            <p className="text-sm font-semibold text-white">{user.name}</p>
                            <p className="text-xs text-[#B6BDC9]">{user.email}</p>
                          </div>
                          <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-[#B6BDC9] hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                            <MdPerson size={16} /> Profile
                          </Link>
                          <Link to="/tickets" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-[#B6BDC9] hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                            <MdConfirmationNumber size={16} /> My Tickets
                          </Link>
                          {isAdmin && (
                            <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-[#FF4D6D] hover:bg-white/10 rounded-xl transition-colors">
                              <MdDashboard size={16} /> Admin Dashboard
                            </Link>
                          )}
                          <div className="border-t border-white/10 mt-1 pt-1">
                            <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#EF4444] hover:bg-white/10 rounded-xl transition-colors">
                              <MdLogout size={16} /> Sign out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-sm text-[#B6BDC9] hover:text-white transition-colors">Sign in</Link>
                  <Link to="/register" className="px-4 py-2 bg-[#FF4D6D] text-white text-sm font-semibold rounded-xl hover:bg-[#e63d5a] transition-all shadow-lg">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(p => !p)}
                className="md:hidden p-2 rounded-xl text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
                aria-label="Menu"
              >
                {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#111827] border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/events', label: 'Events' },
                  { to: '/cities', label: 'Cities' },
                  { to: '/categories', label: 'Categories' },
                  { to: '/tickets', label: 'Tickets' },
                ].map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm transition-all ${isActive ? 'bg-white/10 text-white' : 'text-[#B6BDC9] hover:text-white hover:bg-white/10'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                {!user && (
                  <div className="flex gap-2 pt-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2.5 bg-white/10 text-white text-sm rounded-xl">Sign in</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2.5 bg-[#FF4D6D] text-white text-sm font-semibold rounded-xl">Get Started</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0F19]/95 backdrop-blur-xl p-4 pt-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <SearchBar className="flex-1" onClose={() => setSearchOpen(false)} />
              <button onClick={() => setSearchOpen(false)} className="p-2 text-[#B6BDC9] hover:text-white">
                <MdClose size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
