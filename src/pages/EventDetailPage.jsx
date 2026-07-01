import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdLocationOn, MdCalendarToday, MdAccessTime, MdPeople, MdShare,
  MdBookmark, MdBookmarkBorder, MdStar, MdVerified, MdArrowBack,
  MdConfirmationNumber, MdOpenInNew,
} from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import EventCard from '../components/cards/EventCard';
import { SkeletonHero, SkeletonText } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useAuth } from '../contexts/AuthContext';
import { eventService } from '../services/eventService';
import { formatDate, formatCurrency, formatNumber, getOccupancyColor } from '../utils';

const TicketModal = ({ event, isOpen, onClose }) => {
  const { user } = useAuth();
  const [selected, setSelected] = useState('standard');
  const [qty, setQty] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [success, setSuccess] = useState(false);

  const tickets = [
    { id: 'standard', label: 'Standard', price: event?.price || 0, available: event?.ticketsAvailable || 0 },
    { id: 'vip', label: 'VIP', price: event?.priceVIP || 0, available: Math.floor((event?.ticketsAvailable || 0) * 0.2) },
  ].filter(t => t.price > 0 || event?.isFree);

  const selectedTicket = tickets.find(t => t.id === selected) || tickets[0];
  const total = selectedTicket ? selectedTicket.price * qty : 0;

  const handlePurchase = async () => {
    if (!user) { onClose(); return; }
    setPurchasing(true);
    await new Promise(r => setTimeout(r, 1500));
    setPurchasing(false);
    setSuccess(true);
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Get Tickets" size="md">
      <div className="p-6">
        {success ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-[#B6BDC9] mb-6">Your tickets for <strong className="text-white">{event.title}</strong> have been booked.</p>
            <p className="text-sm text-[#B6BDC9] mb-6">Check your email for confirmation and QR codes.</p>
            <Button onClick={onClose} variant="primary">Done</Button>
          </motion.div>
        ) : (
          <>
            <div className="flex gap-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white">{event.title}</h3>
                <p className="text-sm text-[#B6BDC9]">{formatDate(event.date)} · {event.time}</p>
                <p className="text-sm text-[#B6BDC9]">{event.venue}, {event.city}</p>
              </div>
            </div>

            {/* Ticket types */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-white">Select Ticket Type</h4>
              {tickets.map(ticket => (
                <button
                  key={ticket.id}
                  onClick={() => setSelected(ticket.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    selected === ticket.id
                      ? 'border-[#FF4D6D] bg-[#FF4D6D]/10'
                      : 'border-white/10 bg-white/5 hover:border-white/25'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium text-white">{ticket.label}</p>
                    <p className="text-xs text-[#B6BDC9]">{ticket.available} available</p>
                  </div>
                  <span className="font-bold text-[#FF4D6D] font-mono">{formatCurrency(ticket.price)}</span>
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-white">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all font-bold">−</button>
                <span className="text-white font-mono w-6 text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))} className="w-8 h-8 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all font-bold">+</button>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
              <span className="text-[#B6BDC9]">Total ({qty} ticket{qty > 1 ? 's' : ''})</span>
              <span className="text-xl font-bold text-white font-mono">{formatCurrency(total)}</span>
            </div>

            {!user ? (
              <div className="text-center">
                <p className="text-[#B6BDC9] text-sm mb-4">Sign in to purchase tickets</p>
                <Link to="/login" onClick={onClose}>
                  <Button variant="primary" fullWidth>Sign In to Continue</Button>
                </Link>
              </div>
            ) : (
              <Button variant="primary" fullWidth loading={purchasing} onClick={handlePurchase} size="lg">
                <MdConfirmationNumber size={18} />
                {purchasing ? 'Processing...' : `Pay ${formatCurrency(total)}`}
              </Button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const { toggle, isBookmarked } = useBookmarks();

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
  const occupancyColor = getOccupancyColor(event.occupancyRate);

  return (
    <MainLayout>
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/60 to-transparent" />

        {/* Back button */}
        <Link
          to="/events"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-xl text-white text-sm hover:bg-black/60 transition-all border border-white/10"
        >
          <MdArrowBack size={16} /> Back
        </Link>

        {/* Share/Save */}
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
            {/* Title card */}
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
                    <p className="text-sm font-medium text-white">{formatNumber(event.attendance)} attending</p>
                    <p className="text-xs text-[#B6BDC9]">of {formatNumber(event.capacity)} capacity</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#121826] border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">About This Event</h2>
              <p className="text-[#B6BDC9] leading-relaxed">{event.description}</p>
            </motion.div>

            {/* Gallery */}
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

            {/* Venue map placeholder */}
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
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-[#FF4D6D] hover:underline"
                  >
                    Open in Google Maps <MdOpenInNew size={12} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Organizer */}
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
          </div>

          {/* Sticky purchase card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#121826] border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                {/* Price */}
                <div className="mb-5">
                  <p className="text-sm text-[#B6BDC9] mb-1">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white font-mono">{formatCurrency(event.price)}</span>
                    {event.priceVIP > 0 && <span className="text-sm text-[#B6BDC9]">· VIP {formatCurrency(event.priceVIP)}</span>}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#B6BDC9]">Tickets available</span>
                    <span className="font-mono text-white">{event.ticketsAvailable}</span>
                  </div>
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#B6BDC9]">Rating</span>
                    <span className="flex items-center gap-1 text-[#F59E0B]">
                      <MdStar size={14} /> {event.rating} ({event.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#B6BDC9]">Popularity</span>
                    <span className="font-mono text-[#FF4D6D]">{event.popularityScore}%</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={() => setTicketOpen(true)}
                  icon={<MdConfirmationNumber size={18} />}
                >
                  Get Tickets
                </Button>

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

        {/* Related events */}
        {related.length > 0 && (
          <section className="pb-16">
            <h2 className="section-title mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          </section>
        )}
      </div>

      <TicketModal event={event} isOpen={ticketOpen} onClose={() => setTicketOpen(false)} />
    </MainLayout>
  );
};

export default EventDetailPage;
