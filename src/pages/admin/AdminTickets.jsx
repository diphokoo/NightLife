import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdSearch, MdFavorite } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { formatDate } from '../../utils';

const AdminInterests = () => {
  const [interests, setInterests] = useState([]);
  const [events, setEvents] = useState({});
  const [users, setUsers] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [intSnap, evSnap, usSnap] = await Promise.all([
        getDocs(collection(db, 'interests')),
        getDocs(collection(db, 'events')),
        getDocs(collection(db, 'users')),
      ]);
      const evMap = {};
      evSnap.docs.forEach(d => { evMap[d.id] = d.data(); });
      const usMap = {};
      usSnap.docs.forEach(d => { usMap[d.id] = d.data(); });
      setEvents(evMap);
      setUsers(usMap);
      setInterests(intSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load().finally(() => setLoading(false));
  }, []);

  const filtered = interests.filter(item => {
    const ev = events[item.eventId];
    const us = users[item.userId];
    const q = search.toLowerCase();
    return !q ||
      ev?.title?.toLowerCase().includes(q) ||
      us?.name?.toLowerCase().includes(q) ||
      us?.email?.toLowerCase().includes(q);
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Event Interests</h1>
          <p className="text-[#B6BDC9] text-sm mt-1">{interests.length} interest{interests.length !== 1 ? 's' : ''} recorded</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Interests', count: interests.length, color: '#FF4D6D' },
            { label: 'Unique Events', count: new Set(interests.map(i => i.eventId)).size, color: '#7C5CFF' },
            { label: 'Unique Users', count: new Set(interests.map(i => i.userId)).size, color: '#22C55E' },
          ].map(({ label, count, color }) => (
            <div key={label} className="bg-[#121826] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                <MdFavorite size={20} style={{ color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-white font-mono">{count}</p>
                <p className="text-sm text-[#B6BDC9]">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative max-w-sm">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BDC9]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by event or user..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-[#B6BDC9] text-sm focus:outline-none focus:border-[#FF4D6D]"
          />
        </div>

        <div className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Event', 'User', 'Date Marked', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#B6BDC9] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 bg-white/5 rounded skeleton" /></td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={4}><EmptyState type="events" title="No interests found" /></td></tr>
                ) : (
                  filtered.map((item, i) => {
                    const ev = events[item.eventId];
                    const us = users[item.userId];
                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-white/5 hover:bg-white/3 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-white max-w-[200px] truncate">
                          {ev?.title || item.eventId}
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm text-white">{us?.name || '—'}</p>
                            <p className="text-xs text-[#B6BDC9]">{us?.email || item.userId}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#B6BDC9] whitespace-nowrap">
                          {item.createdAt?.toDate ? formatDate(item.createdAt.toDate().toISOString(), 'dd MMM yy') : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <Badge color="pink">Interested</Badge>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInterests;
