import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdSearch, MdQrCode, MdCheckCircle, MdCancel } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import Badge from '../../components/common/Badge';
import { mockEvents } from '../../services/mockData';
import { formatDate, formatCurrency } from '../../utils';

const MOCK_TICKETS = mockEvents.slice(0, 15).map((event, i) => ({
  id: `TKT-${event.id.slice(-6).toUpperCase()}`,
  event: event.title,
  eventId: event.id,
  buyer: ['Thabo Nkosi', 'Lerato Dlamini', 'Sipho Mthembu', 'Ayanda Zulu'][i % 4],
  date: event.date,
  price: event.price,
  type: i % 3 === 0 ? 'VIP' : 'Standard',
  status: i % 5 === 0 ? 'cancelled' : i % 7 === 0 ? 'used' : 'valid',
  city: event.city,
}));

const statusColor = { valid: 'green', used: 'gray', cancelled: 'danger' };

const AdminTickets = () => {
  const [search, setSearch] = useState('');
  const tickets = MOCK_TICKETS.filter(t =>
    t.event.toLowerCase().includes(search.toLowerCase()) ||
    t.buyer.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Ticket Management</h1>
          <p className="text-[#B6BDC9] text-sm mt-1">{MOCK_TICKETS.length} tickets issued</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Valid Tickets', count: MOCK_TICKETS.filter(t => t.status === 'valid').length, color: '#22C55E' },
            { label: 'Used Tickets', count: MOCK_TICKETS.filter(t => t.status === 'used').length, color: '#B6BDC9' },
            { label: 'Cancelled', count: MOCK_TICKETS.filter(t => t.status === 'cancelled').length, color: '#EF4444' },
          ].map(({ label, count, color }) => (
            <div key={label} className="bg-[#121826] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                <MdQrCode size={20} style={{ color }} />
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
            placeholder="Search tickets..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-[#B6BDC9] text-sm focus:outline-none focus:border-[#FF4D6D]"
          />
        </div>

        <div className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Ticket ID', 'Event', 'Buyer', 'Date', 'Type', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#B6BDC9] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, i) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-mono text-[#FF4D6D]">{ticket.id}</td>
                    <td className="px-4 py-3 text-sm text-white max-w-[160px] truncate">{ticket.event}</td>
                    <td className="px-4 py-3 text-sm text-[#B6BDC9]">{ticket.buyer}</td>
                    <td className="px-4 py-3 text-sm text-[#B6BDC9] whitespace-nowrap">{formatDate(ticket.date, 'dd MMM yy')}</td>
                    <td className="px-4 py-3">
                      <Badge color={ticket.type === 'VIP' ? 'purple' : 'gray'}>{ticket.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-[#FF4D6D]">{formatCurrency(ticket.price)}</td>
                    <td className="px-4 py-3">
                      <Badge color={statusColor[ticket.status]} className="capitalize">{ticket.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-[#22C55E] hover:bg-white/10 transition-all" title="Validate">
                          <MdCheckCircle size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-[#EF4444] hover:bg-white/10 transition-all" title="Cancel">
                          <MdCancel size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTickets;
