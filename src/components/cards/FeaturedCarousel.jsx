import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight, MdPlayArrow, MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { formatDate, formatCurrency } from '../../utils';

const FeaturedCarousel = ({ events = [] }) => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + events.length) % events.length);
  const next = () => setCurrent(c => (c + 1) % events.length);

  const { toggle, isBookmarked } = useBookmarks();

  if (!events.length) return null;

  const event = events[current];

  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden rounded-3xl">
      {/* Background image */}
      {events.map((e, i) => (
        <motion.div
          key={e.id}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/80 via-transparent to-transparent" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-8 md:p-12">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#FF4D6D] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              ⭐ Featured
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
              {event.categoryIcon} {event.categoryLabel}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 leading-tight">
            {event.title}
          </h1>

          <p className="text-lg text-white/80 mb-2">{event.artist}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-6">
            <span>📅 {formatDate(event.date)}</span>
            <span>📍 {event.venue}, {event.city}</span>
            <span>👥 {event.attendance?.toLocaleString()} attending</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={`/events/${event.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF4D6D] text-white font-semibold rounded-2xl hover:bg-[#e63d5a] transition-all shadow-lg hover:shadow-[0_0_30px_rgba(255,77,109,0.4)] active:scale-95"
            >
              <MdPlayArrow size={20} />
              Get Tickets · {formatCurrency(event.price)}
            </Link>
            <button
              onClick={() => toggle(event.id)}
              className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-sm text-white rounded-2xl hover:bg-white/25 transition-all border border-white/20"
            >
              {isBookmarked(event.id) ? <MdBookmark size={18} className="text-[#FF4D6D]" /> : <MdBookmarkBorder size={18} />}
              Save
            </button>
          </div>
        </motion.div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-all border border-white/10"
        aria-label="Previous event"
      >
        <MdChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-all border border-white/10"
        aria-label="Next event"
      >
        <MdChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 right-8 flex gap-2">
        {events.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2 bg-[#FF4D6D]' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Event counter */}
      <div className="absolute top-6 right-6 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-xl text-white text-sm font-mono border border-white/10">
        {String(current + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
