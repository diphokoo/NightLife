import { NavLink, useLocation } from 'react-router-dom';
import { MdHome, MdSearch, MdEvent, MdBookmark, MdPerson } from 'react-icons/md';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/', icon: MdHome, label: 'Home' },
  { to: '/search', icon: MdSearch, label: 'Search' },
  { to: '/events', icon: MdEvent, label: 'Events' },
  { to: '/profile?tab=saved', icon: MdBookmark, label: 'Saved' },
  { to: '/profile', icon: MdPerson, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#111827]/95 backdrop-blur-xl border-t border-white/10 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to.split('?')[0]);
          return (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all relative"
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                />
              )}
              <Icon
                size={22}
                className={`relative z-10 transition-colors ${isActive ? 'text-[#FF4D6D]' : 'text-[#B6BDC9]'}`}
              />
              <span className={`text-[10px] font-medium relative z-10 transition-colors ${isActive ? 'text-[#FF4D6D]' : 'text-[#B6BDC9]'}`}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
