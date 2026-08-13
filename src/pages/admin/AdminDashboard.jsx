import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MdTrendingUp, MdEvent, MdPeople, MdBarChart, MdFavorite } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import { analyticsService } from '../../services/eventService';
import { formatNumber } from '../../utils';
import { COLORS } from '../../constants';
import { useAnimatedCounter } from '../../hooks/useEvents';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const StatCard = ({ title, value, icon: Icon, color, prefix = '', loading }) => {
  const count = useAnimatedCounter(typeof value === 'number' ? value : 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121826] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={22} style={{ color }} />
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E]">
          <MdTrendingUp size={12} /> Live
        </span>
      </div>
      <p className="text-[#B6BDC9] text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white font-mono">
        {loading ? '—' : `${prefix}${formatNumber(count)}`}
      </p>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [interestCount, setInterestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsService.getStats(),
      analyticsService.getCityData(),
      getDocs(collection(db, 'interests')).then(s => s.size),
    ]).then(([s, c, ic]) => {
      setStats(s);
      setCityData(c);
      setInterestCount(ic);
    }).finally(() => setLoading(false));
  }, []);

  const PIE_COLORS = [COLORS.pink, COLORS.cyan, COLORS.purple, COLORS.green, COLORS.orange];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Dashboard Overview</h1>
          <p className="text-[#B6BDC9] text-sm mt-1">Welcome back! Here's what's happening with NightIQ.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Events" value={stats?.totalEvents} icon={MdEvent} color={COLORS.pink} loading={loading} />
          <StatCard title="Registered Users" value={stats?.totalUsers} icon={MdPeople} color={COLORS.cyan} loading={loading} />
          <StatCard title="Total Interests" value={interestCount} icon={MdFavorite} color={COLORS.purple} loading={loading} />
          <StatCard title="Active Cities" value={cityData.length} icon={MdBarChart} color={COLORS.green} loading={loading} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Events by City</h3>
            {cityData.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-[#B6BDC9] text-sm">No data yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={cityData} dataKey="events" nameKey="city" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
                    {cityData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#121826', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                  <Legend formatter={v => <span style={{ color: '#B6BDC9', fontSize: 11 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Top Cities by Events</h3>
            {cityData.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-[#B6BDC9] text-sm">No data yet.</div>
            ) : (
              <div className="space-y-3">
                {cityData.slice(0, 5).map((item, i) => (
                  <div key={item.city} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#B6BDC9] w-4">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{item.city}</span>
                        <span className="text-sm font-mono text-[#FF4D6D]">{item.events} events</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.events / Math.max(...cityData.map(c => c.events))) * 100}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#7C5CFF]"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-[#B6BDC9] w-20 text-right">{formatNumber(item.attendance)} attending</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
