import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdBookmark, MdBookmarkBorder, MdShare, MdLocationOn, MdPeople, MdCalendarToday } from 'react-icons/md';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { formatDate, formatCurrency } from '../../utils';
import Badge from '../common/Badge';

const EventCard = ({ event, index = 0, variant = 'default' }) => {
  const { toggle, isBookmarked } = useBookmarks();
  const [imgError, setImgError] = useState(false);
  const saved = isBookmarked(event.id);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(event.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: event.title, url: window.location.origin + `/events/${event.id}` });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/events/${event.id}`);
    }
  };

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link to={`/events/${event.id}`} className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
            <img
              src={imgError ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=60' : event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-[#B6BDC9] mb-0.5">{formatDate(event.date, 'EEE, dd MMM')}</p>
                <h3 className="font-semibold text-white text-sm truncate group-hover:text-[#FF4D6D] transition-colors">{event.title}</h3>
                <p className="text-xs text-[#B6BDC9] truncate mt-0.5">{event.venue} · {event.city}</p>
              </div>
              <span className="text-sm font-bold text-[#FF4D6D] flex-shrink-0 font-mono">{formatCurrency(event.price)}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge color="pink" className="text-[10px]">{event.categoryIcon} {event.categoryLabel}</Badge>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        to={`/events/${event.id}`}
        className="block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
        aria-label={`View ${event.title}`}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imgError ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=60' : event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge color="pink">{event.categoryIcon} {event.categoryLabel}</Badge>
            {event.isFeatured && <Badge color="orange">⭐ Featured</Badge>}
            {event.isFree && <Badge color="green">Free</Badge>}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleBookmark}
              className="w-8 h-8 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#FF4D6D] transition-all"
              aria-label={saved ? 'Remove bookmark' : 'Bookmark event'}
            >
              {saved ? <MdBookmark size={16} className="text-[#FF4D6D]" /> : <MdBookmarkBorder size={16} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleShare}
              className="w-8 h-8 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Share event"
            >
              <MdShare size={16} />
            </motion.button>
          </div>

          {/* Date pill */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1">
              <MdCalendarToday size={12} className="text-[#FF4D6D]" />
              <span className="text-xs text-white font-medium">{formatDate(event.date, 'dd MMM yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-base mb-1 group-hover:text-[#FF4D6D] transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-sm text-[#B6BDC9] mb-3 line-clamp-1">{event.artist}</p>

          <div className="flex items-center gap-1.5 text-xs text-[#B6BDC9] mb-3">
            <MdLocationOn size={14} className="text-[#FF4D6D] flex-shrink-0" />
            <span className="truncate">{event.venue}, {event.city}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#B6BDC9]">
              <MdPeople size={14} />
              <span className="font-mono">{event.attendance?.toLocaleString()}</span>
              <span>attending</span>
            </div>
            <span className="font-bold text-[#FF4D6D] font-mono text-sm">
              {formatCurrency(event.price)}
            </span>
          </div>

          {/* Popularity bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-[#B6BDC9] mb-1">
              <span>Popularity</span>
              <span className="font-mono">{event.popularityScore}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${event.popularityScore}%` }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#7C5CFF]"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
