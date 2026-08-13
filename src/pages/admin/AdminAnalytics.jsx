import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MdPeople, MdAccessTime, MdDevices, MdLocationOn } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import { analyticsService } from '../../services/eventService';
import { formatNumber } from '../../utils';
import { COLORS } from '../../constants';
import { useAnimatedCounter } from '../../hooks/useEvents';

const LiveStat = ({ label, value, color, icon: Icon }) => {
  const count = useAnimatedCounter(value);
  return (
    <div className="bg-[#121826] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-xs text-[#22C55E] font-medium">Live</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-white font-mono">{formatNumber(count)}</p>
      <p className="text-sm text-[#B6BDC9] mt-1">{label}</p>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#121826] border border-white/10 rounded-xl p-3 shadow-2xl">
      <p className="text-xs text-[#B6BDC9] mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name}: {formatNumber(p.value)}
        </p>
      ))}
    </div>
  );
};

const AdminAnalytics = () => {
  const [cityData, setCityData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true); // eslint-disable-line no-unused-vars

  useEffect(() => {
    Promise.all([
      analyticsService.getStats(),
      analyticsService.getCityData(),
    ]).then(([s, c]) => {
      setStats(s);
      setCityData(c);
    }).finally(() => setLoading(false));
  }, []);

  const liveStats = [
    { label: 'Total Events', value: stats?.totalEvents || 0, color: COLORS.pink, icon: MdPeople },
    { label: 'Active Cities', value: cityData.length, color: COLORS.cyan, icon: MdLocationOn },
    { label: 'Total Users', value: stats?.totalUsers || 0, color: COLORS.purple, icon: MdAccessTime },
    { label: 'Total Attendance', value: stats?.totalAttendance || 0, color: COLORS.green, icon: MdDevices },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Attendance Analytics</h1>
          <p className="text-[#B6BDC9] text-sm mt-1">Real-time data from Firebase</p>
        </div>

        {/* Live stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {liveStats.map(stat => <LiveStat key={stat.label} {...stat} />)}
        </div>

        {/* City bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121826] border border-white/10 rounded-2xl p-5"
        >
          <h3 className="font-semibold text-white mb-4">Events by City</h3>
          {cityData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-[#B6BDC9] text-sm">
              No city data available yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="city" tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="events" radius={[6, 6, 0, 0]} name="events">
                  {cityData.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? COLORS.pink : COLORS.cyan} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Attendance trend placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#121826] border border-white/10 rounded-2xl p-5"
        >
          <h3 className="font-semibold text-white mb-4">Attendance Trend</h3>
          {cityData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-[#B6BDC9] text-sm">
              No attendance data available yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="city" tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="attendance" stroke={COLORS.cyan} strokeWidth={2.5} dot={{ fill: COLORS.cyan, r: 3 }} name="attendance" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* City attendance table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="font-semibold text-white">Breakdown by City</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['City', 'Events', 'Total Attendance', 'Avg per Event'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#B6BDC9] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cityData.length === 0 ? (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-[#B6BDC9]">No data available.</td></tr>
                ) : cityData.map(item => (
                  <tr key={item.city} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-white">{item.city}</td>
                    <td className="px-5 py-3 text-sm font-mono text-[#B6BDC9]">{item.events}</td>
                    <td className="px-5 py-3 text-sm font-mono text-white">{formatNumber(item.attendance)}</td>
                    <td className="px-5 py-3 text-sm font-mono text-[#B6BDC9]">
                      {item.events > 0 ? formatNumber(Math.floor(item.attendance / item.events)) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
