import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MdPeople, MdAccessTime, MdDevices, MdLocationOn } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import { analyticsService } from '../../services/eventService';
import { mockHourlyAttendance } from '../../services/mockData';
import { formatNumber, getOccupancyColor } from '../../utils';
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
  const [revenue, setRevenue] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true); // eslint-disable-line no-unused-vars

  useEffect(() => {
    Promise.all([
      analyticsService.getRevenue(),
      analyticsService.getAttendance(),
      analyticsService.getCityData(),
    ]).then(([r, a, c]) => {
      setRevenue(r);
      setAttendance(a);
      setCityData(c);
    }).finally(() => setLoading(false));
  }, []);

  const liveStats = [
    { label: 'Live Attendance', value: 3847, color: COLORS.pink, icon: MdPeople },
    { label: 'Active Venues', value: 12, color: COLORS.cyan, icon: MdLocationOn },
    { label: 'Peak Hour Count', value: 1240, color: COLORS.purple, icon: MdAccessTime },
    { label: 'Connected Devices', value: 5621, color: COLORS.green, icon: MdDevices },
  ];

  // Venue occupancy mock data
  const venueOccupancy = [
    { venue: 'The Dome', occupancy: 87, capacity: 8000 },
    { venue: 'Grand Arena', occupancy: 72, capacity: 20000 },
    { venue: 'Shimmy Beach', occupancy: 95, capacity: 2000 },
    { venue: 'Bassline', occupancy: 60, capacity: 1500 },
    { venue: 'Emperors Palace', occupancy: 45, capacity: 5000 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Attendance Analytics</h1>
          <p className="text-[#B6BDC9] text-sm mt-1">Real-time and historical attendance data</p>
        </div>

        {/* Live stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {liveStats.map(stat => <LiveStat key={stat.label} {...stat} />)}
        </div>

        {/* Hourly attendance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121826] border border-white/10 rounded-2xl p-5"
        >
          <h3 className="font-semibold text-white mb-4">Hourly Attendance Today</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mockHourlyAttendance}>
              <defs>
                <linearGradient id="hourlyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.purple} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={COLORS.purple} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fill: '#B6BDC9', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke={COLORS.purple} strokeWidth={2} fill="url(#hourlyGrad)" name="attendees" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Monthly attendance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Monthly Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="tickets" stroke={COLORS.cyan} strokeWidth={2.5} dot={{ fill: COLORS.cyan, r: 3 }} name="tickets" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Venue occupancy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#121826] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">Venue Occupancy</h3>
            <div className="space-y-4">
              {venueOccupancy.map((v, i) => {
                const color = getOccupancyColor(v.occupancy);
                return (
                  <div key={v.venue}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-white">{v.venue}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#B6BDC9] font-mono">{v.capacity.toLocaleString()} cap</span>
                        <span className="text-sm font-bold font-mono" style={{ color }}>{v.occupancy}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${v.occupancy}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Weekly attendance bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#121826] border border-white/10 rounded-2xl p-5"
        >
          <h3 className="font-semibold text-white mb-4">Weekly Attendance by Day</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#B6BDC9', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="attendance" radius={[6, 6, 0, 0]} name="attendance">
                {attendance.map((_, i) => (
                  <Cell key={i} fill={i === 5 || i === 6 ? COLORS.pink : COLORS.cyan} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* City attendance table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="font-semibold text-white">Attendance by City</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['City', 'Events', 'Total Attendance', 'Avg per Event', 'Trend'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#B6BDC9] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cityData.map((item, i) => (
                  <tr key={item.city} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-white">{item.city}</td>
                    <td className="px-5 py-3 text-sm font-mono text-[#B6BDC9]">{item.events}</td>
                    <td className="px-5 py-3 text-sm font-mono text-white">{formatNumber(item.attendance)}</td>
                    <td className="px-5 py-3 text-sm font-mono text-[#B6BDC9]">{formatNumber(Math.floor(item.attendance / item.events))}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold ${i % 3 === 0 ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
                        {i % 3 === 0 ? '↓ -3.2%' : '↑ +12.4%'}
                      </span>
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
