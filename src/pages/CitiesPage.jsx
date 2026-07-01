import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { SA_CITIES } from '../constants';
import { mockEvents } from '../services/mockData';

const CitiesPage = () => {
  const cityStats = SA_CITIES.map(city => ({
    city,
    count: mockEvents.filter(e => e.city === city).length,
    image: `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=60`,
  }));

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-h2 font-display font-bold text-white mb-2">Events by City</h1>
          <p className="text-[#B6BDC9]">Discover events happening across South Africa</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cityStats.map(({ city, count }, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={`/events?city=${city}`}
                className="relative h-48 rounded-2xl overflow-hidden block group"
              >
                <img
                  src={`https://source.unsplash.com/600x400/?${city},south+africa`}
                  alt={city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=60'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{city}</h3>
                  <p className="text-sm text-white/70">{count} events</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CitiesPage;
