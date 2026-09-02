import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdLocationOn } from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import { analyticsService } from '../services/eventService';

const CityCard = ({ city, count, index, large }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04 }}
    whileHover={{ y: -4 }}
  >
    <Link
      to={`/events?city=${city}`}
      className={`relative ${large ? 'h-56' : 'h-44'} rounded-2xl overflow-hidden block group`}
    >
      <img
        src={`https://source.unsplash.com/600x400/?${city},south+africa,city`}
        alt={city}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=60'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {large && (
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF4D6D] text-white text-xs font-bold rounded-full">
          #{index + 1} Popular
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className={`font-bold text-white ${large ? 'text-2xl' : 'text-lg'}`}>{city}</h3>
        <p className="text-sm text-white/70 flex items-center gap-1 mt-0.5">
          <MdLocationOn size={13} /> {count} {count === 1 ? 'event' : 'events'}
        </p>
      </div>
    </Link>
  </motion.div>
);

const SkeletonCity = ({ large }) => (
  <div className={`${large ? 'h-56' : 'h-44'} rounded-2xl bg-white/5 skeleton`} />
);

const CitiesPage = () => {
  const [cityStats, setCityStats] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsService.getCityStats(),
      analyticsService.getCities(),
    ]).then(([stats, cities]) => {
      setCityStats(stats);
      setAllCities(cities);
    }).finally(() => setLoading(false));
  }, []);

  const popular = cityStats.slice(0, 6);
  const statsMap = Object.fromEntries(cityStats.map(s => [s.city, s.events]));

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-h2 font-display font-bold text-white mb-2">Events by City</h1>
          <p className="text-[#B6BDC9]">Discover events happening across South Africa</p>
        </div>

        {/* Popular Cities */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">🔥 Popular Cities</h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCity key={i} large />)}
            </div>
          ) : popular.length === 0 ? (
            <p className="text-[#B6BDC9] text-sm">No events found yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popular.map(({ city, events }, i) => (
                <CityCard key={city} city={city} count={events} index={i} large />
              ))}
            </div>
          )}
        </div>

        {/* All Cities A-Z */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">🌍 All Cities</h2>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => <SkeletonCity key={i} />)}
            </div>
          ) : allCities.length === 0 ? (
            <p className="text-[#B6BDC9] text-sm">No cities found yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {allCities.map((city, i) => (
                <CityCard key={city} city={city} count={statsMap[city] || 0} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CitiesPage;
