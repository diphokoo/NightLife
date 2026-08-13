import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdLocationOn, MdCalendarToday, MdAccessTime, MdPeople, MdShare,
  MdBookmark, MdBookmarkBorder, MdStar, MdVerified, MdArrowBack,
  MdFavorite, MdFavoriteBorder, MdOpenInNew,
} from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import EventCard from '../components/cards/EventCard';
import { SkeletonHero, SkeletonText } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useInterests } from '../contexts/InterestContext';
import { useAuth } from '../contexts/AuthContext';
import { eventService } from '../services/eventService';
import { formatDate, formatCurrency, formatNumber, getOccupancyColor } from '../utils';

const EventDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const { toggle, isBookmarked } = useBookmarks();
  const { toggle: toggleInterest, isInterested } = useInterests();

  useEffect(() => {
    setLoading(true);
    eventService.getById(id).then(async (e) => {
      setEvent(e);
      if (e) {
        const rel = await eventService.getRelated(e);
        setRelated(rel);
      }
    }).finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <MainLayout>
      <SkeletonHero />
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <SkeletonText lines={5} />
      </div>
    </MainLayout>
  );

  if (!event) return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-20">
        <EmptyState type="events" title="Event not found" message="This event doesn't exist or has been removed." />
      </div>
    </MainLayout>
  );

  const saved = isBookmarked(event.id);
  const interested = isInterested(event.id);
  const occupancyColor = getOccupancyColor(event.occupancyRate);

  return (
    <MainLayout>
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/60 to-transparent" />

        <Link
          to="/events"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-xl text-white text-sm hover:bg-black/60 transition-all border border-white/10"
        >
          <MdArrowBack size={16} /> Back
        </Link>

        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={() => toggle(event.id)}
            className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/10"
            aria-label={saved ? 'Remove bookmark' : 'Save event'}
          >
            {saved ? <MdBookmark size={18} className="text-[#FF4D6D]" /> : <MdBookmarkBorder size={18} />}
          </button>
          <button
            onClick={() => navigator.share?.({ title: event.title, url: window.location.href })}
            className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/10"
            aria-label="Share event"
          >
            <MdShare size={18} />
          </button>
        </div>
      </div>

      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-16 relative z-10 pb-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121826] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge color="pink">{event.categoryIcon} {event.categoryLabel}</Badge>
                {event.isFeatured && <Badge color="orange">⭐ Featured</Badge>}
                {event.isFree && <Badge color="green">Free Entry</Badge>}
                {event.isTrending && <Badge color="cyan">🔥 Trending</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{event.title}</h1>
              <p className="text-lg text-[#B6BDC9] mb-4">{event.artist}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <MdCalendarToday size={20} className="text-[#FF4D6D]" />
                  <div>
                    <p className="text-xs text-[#B6BDC9]">Date</p>
                    <p className="text-sm font-medium text-white">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <MdAccessTime size={20} className="text-[#00D4FF]" />
                  <div>
                    <p className="text-xs text-[#B6BDC9]">Time</p>
                    <p className="text-sm font-medium text-white">{event.time} – {event.endTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <MdLocationOn size={20} className="text-[#7C5CFF]" />
                  <div>
                    <p className="text-xs text-[#B6BDC9]">Venue</p>
                    <p className="text-sm font-medium text-white">{event.venue}</p>
                    <p className="text-xs text-[#B6BDC9]">{event.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <MdPeople size={20} className="text-[#22C55E]" />
                  <div>
                    <p className="text-xs text-[#B6BDC9]">Attendance</p>
                    <p className="text-sm font-medium text-white">{formatNumber(event.attendance || 0)} attending</p>
                    <p className="text-xs text-[#B6BDC9]">of {formatNumber(event.capacity || 0)} capacity</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#121826] border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">About This Event</h2>
              <p className="text-[#B6BDC9] leading-relaxed">{event.description}</p>
            </motion.div>

            {event.gallery?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[#121826] border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {event.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#FF4D6D]' : 'border-transparent hover:border-white/30'}`}
                    >
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-2xl overflow-hidden h-64">
                  <img src={event.gallery[activeImg]} alt="Selected" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#121826] border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Venue</h2>
              <div className="flex items-start gap-3 mb-4">
                <MdLocationOn size={20} className="text-[#FF4D6D] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">{event.venue}</p>
                  <p className="text-sm text-[#B6BDC9]">{event.address}</p>
                </div>
              </div>
              <div className="h-48 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <MdLocationOn size={32} className="text-[#FF4D6D] mx-auto mb-2" />
                  <p className="text-sm text-[#B6BDC9]">{event.venue}, {event.city}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.address || `${event.venue} ${event.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-[#FF4D6D] hover:underline"
                  >
                    Open in Google Maps <MdOpenInNew size={12} />
                  </a>
                </div>
              </div>
            </motion.div>

            {event.organizer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-[#121826] border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Organizer</h2>
                <div className="flex items-center gap-4">
                  <img src={event.organizer.avatar} alt={event.organizer.name} className="w-14 h-14 rounded-2xl" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{event.organizer.name}</p>
                      {event.organizer.verified && <MdVerified size={16} className="text-[#00D4FF]" />}
                    </div>
                    <p className="text-sm text-[#B6BDC9]">Event Organizer</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky side card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#121826] border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <div className="mb-5">
                  <p className="text-sm text-[#B6BDC9] mb-1">Entry</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white font-mono">{formatCurrency(event.price || 0)}</span>
                    {event.priceVIP > 0 && <span className="text-sm text-[#B6BDC9]">· VIP {formatCurrency(event.priceVIP)}</span>}
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {event.rating && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#B6BDC9]">Rating</span>
                      <span className="flex items-center gap-1 text-[#F59E0B]">
                        <MdStar size={14} /> {event.rating} ({event.reviewCount || 0})
                      </span>
                    </div>
                  )}
                  {event.popularityScore && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#B6BDC9]">Popularity</span>
                      <span className="font-mono text-[#FF4D6D]">{event.popularityScore}%</span>
                    </div>
                  )}
                  {event.occupancyRate > 0 && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#B6BDC9]">Occupancy</span>
                        <span className="font-mono font-semibold" style={{ color: occupancyColor }}>{event.occupancyRate}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${event.occupancyRate}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="h-full rounded-full"
                          style={{ background: occupancyColor }}
                        />
                      </div>
                    </>
                  )}
                </div>

                {user ? (
                  <Button
                    variant={interested ? 'secondary' : 'primary'}
                    fullWidth
                    size="lg"
                    onClick={() => toggleInterest(event.id)}
                    icon={interested ? <MdFavorite size={18} className="text-[#FF4D6D]" /> : <MdFavoriteBorder size={18} />}
                  >
                    {interested ? "I'm Interested" : 'Mark as Interested'}
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button variant="primary" fullWidth size="lg" icon={<MdFavoriteBorder size={18} />}>
                      Sign In to Show Interest
                    </Button>
                  </Link>
                )}

                <button
                  onClick={() => toggle(event.id)}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  {saved ? <MdBookmark size={16} className="text-[#FF4D6D]" /> : <MdBookmarkBorder size={16} />}
                  {saved ? 'Saved' : 'Save Event'}
                </button>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-4">
                  <span className="text-xs text-[#B6BDC9]">Share:</span>
                  {['Twitter', 'Facebook', 'WhatsApp'].map(s => (
                    <button key={s} className="text-xs text-[#B6BDC9] hover:text-white transition-colors">{s}</button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pb-16">
            <h2 className="section-title mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default EventDetailPage;
