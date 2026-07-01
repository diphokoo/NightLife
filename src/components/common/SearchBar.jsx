import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSearch, MdClose, MdTrendingUp, MdHistory } from 'react-icons/md';
import { useSearch } from '../../hooks/useEvents';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils';

const TRENDING = ['Amapiano Nights', 'Cape Town Carnival', 'Black Coffee', 'Durban July', 'Joburg Arts Fest'];

const SearchBar = ({ placeholder = 'Search events, artists, venues...', className = '', onClose }) => {
  const { query, results, loading, search, setQuery, setResults } = useSearch();
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pulse-search-history') || '[]'); }
    catch { return []; }
  });
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const showDropdown = focused && (query.length > 0 || history.length > 0);

  const handleSelect = (item) => {
    const newHistory = [item, ...history.filter(h => h !== item)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('pulse-search-history', JSON.stringify(newHistory));
    setQuery('');
    setResults([]);
    setFocused(false);
    if (onClose) onClose();
    navigate(`/search?q=${encodeURIComponent(item)}`);
  };

  const handleEventClick = (event) => {
    handleSelect(event.title);
    navigate(`/events/${event.id}`);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('pulse-search-history');
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') { setFocused(false); inputRef.current?.blur(); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center gap-3 bg-white/8 border rounded-2xl px-4 py-2.5 transition-all duration-200 ${focused ? 'border-[#FF4D6D] bg-white/10 shadow-[0_0_0_3px_rgba(255,77,109,0.15)]' : 'border-white/10 hover:border-white/20'}`}>
        <MdSearch size={20} className={`flex-shrink-0 transition-colors ${focused ? 'text-[#FF4D6D]' : 'text-[#B6BDC9]'}`} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => search(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-[#B6BDC9] text-sm outline-none min-w-0"
          aria-label="Search events"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-listbox"
          aria-autocomplete="list"
        />
        {loading && <span className="w-4 h-4 border-2 border-[#FF4D6D] border-t-transparent rounded-full animate-spin flex-shrink-0" />}
        {query && !loading && (
          <button onClick={() => { search(''); setFocused(true); }} className="text-[#B6BDC9] hover:text-white transition-colors flex-shrink-0">
            <MdClose size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#121826] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
            role="listbox"
          >
            {/* Search results */}
            {results.length > 0 && (
              <div className="p-2">
                <p className="text-xs text-[#B6BDC9] px-3 py-1.5 font-medium">Events</p>
                {results.map(event => (
                  <button
                    key={event.id}
                    onMouseDown={() => handleEventClick(event)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  role="option"
                  aria-selected={false}
                  >
                    <img src={event.image} alt={event.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{event.title}</p>
                      <p className="text-xs text-[#B6BDC9] truncate">{event.venue} · {event.city}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#FF4D6D] flex-shrink-0">{formatCurrency(event.price)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {query.length >= 2 && results.length === 0 && !loading && (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-[#B6BDC9]">No results for "<span className="text-white">{query}</span>"</p>
              </div>
            )}

            {/* History */}
            {!query && history.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-1.5">
                  <p className="text-xs text-[#B6BDC9] font-medium">Recent searches</p>
                  <button onMouseDown={clearHistory} className="text-xs text-[#FF4D6D] hover:underline">Clear</button>
                </div>
                {history.map((item, i) => (
                  <button
                    key={i}
                    onMouseDown={() => handleSelect(item)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/8 transition-colors text-left"
                  >
                    <MdHistory size={16} className="text-[#B6BDC9] flex-shrink-0" />
                    <span className="text-sm text-white">{item}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Trending */}
            {!query && (
              <div className="p-2 border-t border-white/10">
                <p className="text-xs text-[#B6BDC9] px-3 py-1.5 font-medium flex items-center gap-1.5">
                  <MdTrendingUp size={14} className="text-[#FF4D6D]" /> Trending
                </p>
                <div className="flex flex-wrap gap-2 px-3 pb-2">
                  {TRENDING.map(t => (
                    <button
                      key={t}
                      onMouseDown={() => handleSelect(t)}
                      className="px-3 py-1 bg-white/8 hover:bg-white/15 rounded-full text-xs text-[#B6BDC9] hover:text-white transition-colors border border-white/10"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
