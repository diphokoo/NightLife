import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { MdTrendingUp, MdTrendingDown, MdEvent, MdPeople, MdAttachMoney, MdBarChart } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import { analyticsService } from '../../services/eventService';
import { formatCurrency, formatNumber } from '../../utils';
import { COLORS } from '../../constants';
import { useAnimatedCounter } from '../../hooks/useEvents';

const StatCard = ({ title, value, growth, icon: Icon, color, prefix = '', loading }) => {
  const count = useAnimatedCounter(typeof value === 'number' ? value : 0);
  const isPositive = growth >= 0;

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
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#EF4444]/15 text-[#EF4444]'}`}>
          {isPositive ? <MdTrendingUp size={12} /> : <MdTrendingDown size={12} />}
          {Math.abs(growth)}%
        </span>
      </div>
      <p className="text-[#B6BDC9] text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white font-mono">
        {loading ? '—' : `${prefix}${formatNumber(count)}`}
      </p>
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#121826] border border-white/10 rounded-xl p-3 shadow-2xl">
      <p className="text-xs text-[#B6BDC9] mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name}: {p.name === 'revenue' ? formatCurrency(p.value) : formatNumber(p.value)}
        </p>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsService.getStats(),
      analyticsService.getRevenue(),
      analyticsService.getAttendance(),
      analyticsService.getCityData(),
    ]).then(([s, r, a, c]) => {
      setStats(s);
      setRevenue(r);
      setAttendance(a);
      setCityData(c);
    }).finally(() => setLoading(false));
  }, []);

  const PIE_COLORS = [COLORS.pink, COLORS.cyan, COLORS.purple, COLORS.green, COLORS.orange];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Dashboard Overview</h1>
          <p className="text-[#B6BDC9] text-sm mt-1">Welcome back! Here's what's happening with Pulse SA.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Events" value={stats?.totalEvents} growth={stats?.growthRate} icon={MdEvent} color={COLORS.pink} loading={loading} />
          <StatCard title="Total Revenue" value={stats?.totalRevenue} growth={stats?.revenueGrowth} icon={MdAttachMoney} color={COLORS.green} prefix="R" loading={loading} />
          <StatCard title="Total Attendance" value={stats?.totalAttendance} growth={stats?.attendanceGrowth} icon={MdPeople} color={COLORS.cyan} loading={loading} />
          <StatCard title="Registered Users" value={stats?.totalUsers} growth={stats?.userGrowth} icon={MdBarChart} color={COLORS.purple} loading={loading} />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Revenue (12 months)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.pink} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.pink} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `R${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke={COLORS.pink} strokeWidth={2} fill="url(#revenueGrad)" name="revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="attendance" fill={COLORS.cyan} radius={[6, 6, 0, 0]} name="attendance" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Events by City</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={cityData} dataKey="events" nameKey="city" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
                  {cityData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#121826', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Legend formatter={v => <span style={{ color: '#B6BDC9', fontSize: 11 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Top Cities by Revenue</h3>
            <div className="space-y-3">
              {cityData.slice(0, 5).map((item, i) => (
                <div key={item.city} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#B6BDC9] w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{item.city}</span>
                      <span className="text-sm font-mono text-[#FF4D6D]">{formatCurrency(item.revenue)}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.revenue / Math.max(...cityData.map(c => c.revenue))) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#7C5CFF]"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-[#B6BDC9] w-16 text-right">{item.events} events</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
