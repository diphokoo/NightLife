import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { mockEvents } from '../services/mockData';
import { formatDate, formatCurrency } from '../utils';
import Button from '../components/common/Button';

const TicketsPage = () => {
  const { user } = useAuth();
  const tickets = mockEvents.slice(0, 5); // mock purchased tickets

  if (!user) {
    return (
      <MainLayout>
        <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-20 text-center">
          <div className="text-5xl mb-4">🎟️</div>
          <h2 className="text-2xl font-bold text-white mb-3">Sign in to view your tickets</h2>
          <p className="text-[#B6BDC9] mb-6">Access your purchased tickets and QR codes.</p>
          <Link to="/login"><Button variant="primary">Sign In</Button></Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <h1 className="text-h2 font-display font-bold text-white mb-8">My Tickets</h1>

        <div className="space-y-4">
          {tickets.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                <img src={event.image} alt={event.title} className="w-full sm:w-40 h-40 sm:h-auto object-cover" />
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{event.title}</h3>
                      <p className="text-[#B6BDC9] text-sm mt-1">{event.venue}, {event.city}</p>
                      <p className="text-[#B6BDC9] text-sm">{formatDate(event.date)} · {event.time}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-[#FF4D6D] font-mono">{formatCurrency(event.price)}</p>
                      <span className="inline-block mt-1 px-2.5 py-1 bg-[#22C55E]/20 text-[#22C55E] text-xs rounded-full border border-[#22C55E]/30">
                        ✓ Confirmed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#0B0F19] rounded" style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, #0B0F19 0px, #0B0F19 2px, white 2px, white 4px), repeating-linear-gradient(90deg, #0B0F19 0px, #0B0F19 2px, white 2px, white 4px)',
                          backgroundSize: '4px 4px',
                        }} />
                      </div>
                      <div>
                        <p className="text-xs text-[#B6BDC9]">Ticket ID</p>
                        <p className="text-sm font-mono text-white">#{event.id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                    <Link to={`/events/${event.id}`} className="text-sm text-[#FF4D6D] hover:underline">View Event →</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TicketsPage;
