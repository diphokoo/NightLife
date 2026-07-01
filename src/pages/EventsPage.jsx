import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdGridView, MdViewList, MdTune } from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import EventCard from '../components/cards/EventCard';
import { SkeletonCard } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import Drawer from '../components/common/Drawer';
import { eventService } from '../services/eventService';
import { SA_CITIES, EVENT_CATEGORIES } from '../constants';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'date', label: 'Date' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'popularity', label: 'Most Popular' },
];

const FilterChip = ({ label, onRemove }) => (
  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#FF4D6D]/20 text-[#FF4D6D] rounded-full text-xs font-medium border border-[#FF4D6D]/30">
    {label}
    <button onClick={onRemove} className="hover:text-white transition-colors"><MdClose size={12} /></button>
  </span>
);

const FilterPanel = ({ filters, onChange, onClear }) => {
  // eslint-disable-next-line no-unused-vars
  const [priceRange] = useState([filters.minPrice || 0, filters.maxPrice || 5000]);

  return (
    <div className="p-5 space-y-6">
      {/* Cities */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">City</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {SA_CITIES.map(city => (
            <label key={city} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="city"
                value={city}
                checked={filters.city === city}
                onChange={() => onChange({ city: filters.city === city ? '' : city })}
                className="accent-[#FF4D6D]"
              />
              <span className="text-sm text-[#B6BDC9] group-hover:text-white transition-colors">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Category</h4>
        <div className="grid grid-cols-2 gap-2">
          {EVENT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onChange({ category: filters.category === cat.id ? '' : cat.id })}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all border ${
                filters.category === cat.id
                  ? 'bg-[#FF4D6D]/20 text-[#FF4D6D] border-[#FF4D6D]/30'
                  : 'bg-white/5 text-[#B6BDC9] border-white/10 hover:border-white/25'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!filters.isFree} onChange={e => onChange({ isFree: e.target.checked || undefined })} className="accent-[#FF4D6D]" />
              <span className="text-sm text-[#B6BDC9]">Free events only</span>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={e => onChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF4D6D]"
            />
            <span className="text-[#B6BDC9]">—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={e => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF4D6D]"
            />
          </div>
        </div>
      </div>

      {/* Type */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Event Type</h4>
        <div className="space-y-2">
          {[
            { key: 'isIndoor', label: '🏠 Indoor' },
            { key: 'isFamilyFriendly', label: '👨‍👩‍👧 Family Friendly' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={!!filters[key]}
                onChange={e => onChange({ [key]: e.target.checked || undefined })}
                className="accent-[#FF4D6D]"
              />
              <span className="text-sm text-[#B6BDC9]">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onClear}
        className="w-full py-2.5 text-sm text-[#EF4444] border border-[#EF4444]/30 rounded-xl hover:bg-[#EF4444]/10 transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );
};

const EventsPage = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    category: searchParams.get('category') || '',
    search: searchParams.get('q') || '',
    sortBy: searchParams.get('sort') || 'newest',
    isFree: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });

  const activeFilterCount = Object.values(filters).filter(v => v !== '' && v !== undefined && v !== 'newest').length;

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await eventService.getAll({ ...filters, page, limit: 12, status: 'published' });
      setEvents(res.events);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const updateFilter = (update) => {
    setFilters(prev => ({ ...prev, ...update }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ city: '', category: '', search: '', sortBy: 'newest' });
    setPage(1);
  };

  const activeChips = [
    filters.city && { key: 'city', label: `📍 ${filters.city}` },
    filters.category && { key: 'category', label: `🏷 ${EVENT_CATEGORIES.find(c => c.id === filters.category)?.label}` },
    filters.isFree && { key: 'isFree', label: 'Free Events' },
  ].filter(Boolean);

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-h2 font-display font-bold text-white mb-2">
            {filters.city ? `Events in ${filters.city}` : filters.category ? `${EVENT_CATEGORIES.find(c => c.id === filters.category)?.label} Events` : 'All Events'}
          </h1>
          <p className="text-[#B6BDC9]">{total.toLocaleString()} events found</p>
        </div>

        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar
            className="flex-1"
            placeholder="Search events, artists, venues..."
          />
          <div className="flex gap-2">
            <select
              value={filters.sortBy}
              onChange={e => updateFilter({ sortBy: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF4D6D] cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-[#121826]">{o.label}</option>)}
            </select>
            <button
              onClick={() => setFilterOpen(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeFilterCount > 0
                  ? 'bg-[#FF4D6D]/20 text-[#FF4D6D] border-[#FF4D6D]/30'
                  : 'bg-white/5 text-[#B6BDC9] border-white/10 hover:border-white/25'
              }`}
            >
              <MdTune size={18} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-[#FF4D6D] text-white rounded-full text-xs flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
            <button
              onClick={() => setGridView(v => !v)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#B6BDC9] hover:text-white transition-all"
              aria-label="Toggle view"
            >
              {gridView ? <MdViewList size={20} /> : <MdGridView size={20} />}
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {activeChips.map(chip => (
              <FilterChip
                key={chip.key}
                label={chip.label}
                onRemove={() => updateFilter({ [chip.key]: chip.key === 'isFree' ? undefined : '' })}
              />
            ))}
            <button onClick={clearFilters} className="text-xs text-[#B6BDC9] hover:text-white transition-colors px-2">
              Clear all
            </button>
          </div>
        )}

        {/* Events grid */}
        {loading ? (
          <div className={`grid gap-5 ${gridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : events.length === 0 ? (
          <EmptyState type="search" action={clearFilters} actionLabel="Clear filters" />
        ) : (
          <motion.div
            layout
            className={`grid gap-5 ${gridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 max-w-2xl'}`}
          >
            <AnimatePresence mode="popLayout">
              {events.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={i}
                  variant={gridView ? 'default' : 'horizontal'}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-10">
            <Pagination page={page} totalPages={totalPages} onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
          </div>
        )}
      </div>

      {/* Filter drawer */}
      <Drawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} title="Filter Events" width="w-80">
        <FilterPanel filters={filters} onChange={updateFilter} onClear={() => { clearFilters(); setFilterOpen(false); }} />
      </Drawer>
    </MainLayout>
  );
};

export default EventsPage;
