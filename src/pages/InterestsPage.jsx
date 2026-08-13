import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdFavorite, MdFavoriteBorder, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { useInterests } from '../contexts/InterestContext';
import { eventService } from '../services/eventService';
import { formatDate } from '../utils';

const InterestsPage = () => {
  const { user } = useAuth();
  const { interests, toggle } = useInterests();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !interests.length) { setLoading(false); return; }
    setLoading(true);
    eventService.getByIds(interests)
      .then(setEvents)
      .finally(() => setLoading(false));
  }, [user, interests]);

  if (!user) {
    return (
      <MainLayout>
        <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-20 text-center">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-white mb-3">Sign in to view your interests</h2>
          <p className="text-[#B6BDC9] mb-6">Mark events you're interested in attending.</p>
          <Link to="/login"><Button variant="primary">Sign In</Button></Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-h2 font-display font-bold text-white mb-1">My Interests</h1>
          <p className="text-[#B6BDC9]">{interests.length} event{interests.length !== 1 ? 's' : ''} you're interested in</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl skeleton" />)}
          </div>
        ) : events.length === 0 ? (
          <EmptyState
            type="events"
            title="No interested events yet"
            message="Browse events and tap the heart icon to mark ones you're interested in."
            action={() => window.location.href = '/events'}
            actionLabel="Browse Events"
          />
        ) : (
          <div className="space-y-4">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full sm:w-36 h-36 sm:h-auto object-cover flex-shrink-0"
                  />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white text-lg truncate">{event.title}</h3>
                        <p className="text-[#B6BDC9] text-sm mt-0.5">{event.artist}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#B6BDC9]">
                          <span className="flex items-center gap-1">
                            <MdLocationOn size={14} className="text-[#FF4D6D]" />
                            {event.venue}, {event.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <MdCalendarToday size={14} className="text-[#FF4D6D]" />
                            {formatDate(event.date)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(event.id)}
                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FF4D6D]/15 flex items-center justify-center text-[#FF4D6D] hover:bg-[#FF4D6D]/30 transition-all"
                        aria-label="Remove interest"
                      >
                        <MdFavorite size={20} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="px-3 py-1 bg-[#FF4D6D]/15 text-[#FF4D6D] text-xs rounded-full border border-[#FF4D6D]/20 flex items-center gap-1">
                        <MdFavoriteBorder size={12} /> Interested
                      </span>
                      <Link to={`/events/${event.id}`} className="text-sm text-[#FF4D6D] hover:underline">
                        View Event →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default InterestsPage;
