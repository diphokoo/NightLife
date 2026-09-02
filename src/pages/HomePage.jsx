import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdArrowForward, MdLocationOn } from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import FeaturedCarousel from '../components/cards/FeaturedCarousel';
import EventCard from '../components/cards/EventCard';
import { SkeletonCard } from '../components/common/Skeleton';
import { eventService } from '../services/eventService';
import { EVENT_CATEGORIES, SA_CITIES, ANIMATION_VARIANTS } from '../constants';

const SectionHeader = ({ title, subtitle, link, linkLabel = 'View all' }) => (
  <div className="flex items-end justify-between mb-6">
    <div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="text-[#B6BDC9] text-sm mt-1">{subtitle}</p>}
    </div>
    {link && (
      <Link to={link} className="flex items-center gap-1 text-sm text-[#FF4D6D] hover:gap-2 transition-all font-medium">
        {linkLabel} <MdArrowForward size={16} />
      </Link>
    )}
  </div>
);

const CategoryCard = ({ category }) => (
  <motion.div whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }}>
    <Link
      to={`/events?category=${category.id}`}
      className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all group"
      style={{ '--cat-color': category.color }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform"
        style={{ background: `${category.color}20`, border: `1px solid ${category.color}30` }}
      >
        {category.icon}
      </div>
      <span className="text-sm font-medium text-white group-hover:text-[#FF4D6D] transition-colors text-center">
        {category.label}
      </span>
    </Link>
  </motion.div>
);

const CityCard = ({ city, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.03 }}
  >
    <Link
      to={`/events?city=${city}`}
      className="relative h-32 rounded-2xl overflow-hidden block group"
    >
      <img
        src={`https://source.unsplash.com/400x200/?${city},cityscape`}
        alt={city}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        onError={e => { e.target.src = `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=60`; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <div className="flex items-center gap-1 text-white font-semibold text-sm">
          <MdLocationOn size={14} className="text-[#FF4D6D]" /> {city}
        </div>
      </div>
    </Link>
  </motion.div>
);

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="py-16">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FF4D6D]/20 via-[#7C5CFF]/20 to-[#00D4FF]/20 border border-white/10 p-8 md:p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D6D]/5 to-[#7C5CFF]/5" />
        <div className="relative z-10">
          <span className="text-3xl mb-4 block">🎉</span>
          <h2 className="text-3xl font-display font-bold text-white mb-3">Never Miss an Event</h2>
          <p className="text-[#B6BDC9] mb-8 max-w-md mx-auto">
            Get the latest events, exclusive deals, and early bird tickets delivered to your inbox.
          </p>
          {submitted ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-[#22C55E] font-semibold">
              ✅ You're subscribed! Welcome to NightIQ.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-[#B6BDC9] focus:outline-none focus:border-[#FF4D6D] text-sm"
              />
              <button type="submit" className="px-6 py-3 bg-[#FF4D6D] text-white font-semibold rounded-xl hover:bg-[#e63d5a] transition-all whitespace-nowrap">
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      eventService.getFeatured(),
      eventService.getTrending(),
      eventService.getUpcoming(),
      eventService.getAll({ limit: 8 }),
    ]).then(([feat, trend, up, lat]) => {
      setFeatured(feat);
      setTrending(trend);
      setUpcoming(up);
      setLatest(lat.events);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Hero */}
        <section className="pt-6 pb-12">
          {loading ? (
            <div className="h-[70vh] min-h-[500px] bg-white/5 rounded-3xl skeleton" />
          ) : (
            <FeaturedCarousel events={featured} />
          )}
        </section>

        {/* Categories */}
        <section className="py-8">
          <SectionHeader title="Browse by Category" subtitle="Find events that match your vibe" link="/categories" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3">
            {EVENT_CATEGORIES.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="py-8">
          <SectionHeader
            title="🔥 Trending Now"
            subtitle="The hottest events everyone's talking about"
            link="/events?sort=trending"
          />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div
              variants={ANIMATION_VARIANTS.staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {trending.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          )}
        </section>

        {/* Upcoming */}
        <section className="py-8">
          <SectionHeader
            title="📅 Upcoming Events"
            subtitle="Don't miss what's coming up"
            link="/events?sort=date"
          />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {upcoming.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Cities */}
        <section className="py-8">
          <SectionHeader title="🌍 Popular Cities" subtitle="Events happening across South Africa" link="/cities" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SA_CITIES.slice(0, 6).map((city, i) => (
              <CityCard key={city} city={city} index={i} />
            ))}
          </div>
        </section>

        {/* Latest */}
        <section className="py-8">
          <SectionHeader title="✨ Latest Events" subtitle="Fresh events just added" link="/events" />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {latest.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <NewsletterSection />
      </div>
    </MainLayout>
  );
};

export default HomePage;
