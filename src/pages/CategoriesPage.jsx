import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { EVENT_CATEGORIES } from '../constants';
import { mockEvents } from '../services/mockData';

const CategoriesPage = () => {
  const cats = EVENT_CATEGORIES.map(cat => ({
    ...cat,
    count: mockEvents.filter(e => e.category === cat.id).length,
  }));

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-h2 font-display font-bold text-white mb-2">Event Categories</h1>
          <p className="text-[#B6BDC9]">Find events that match your interests</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <Link
                to={`/events?category=${cat.id}`}
                className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 hover:border-white/25 transition-all group"
                style={{ background: `${cat.color}10` }}
              >
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform"
                  style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}
                >
                  {cat.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#FF4D6D] transition-colors">{cat.label}</h3>
                  <p className="text-sm text-[#B6BDC9] mt-1">{cat.count} events</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
