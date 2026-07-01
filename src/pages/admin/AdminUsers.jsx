import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdSearch, MdVerified, MdBlock } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import Badge from '../../components/common/Badge';

const MOCK_USERS = Array.from({ length: 20 }, (_, i) => ({
  id: `u${i}`,
  name: ['Thabo Nkosi', 'Lerato Dlamini', 'Sipho Mthembu', 'Ayanda Zulu', 'Nomsa Khumalo'][i % 5],
  email: `user${i + 1}@example.com`,
  role: i === 0 ? 'admin' : 'user',
  joined: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  tickets: Math.floor(Math.random() * 20),
  status: i % 7 === 0 ? 'suspended' : 'active',
  avatar: `https://ui-avatars.com/api/?name=User+${i + 1}&background=${['FF4D6D', '7C5CFF', '00D4FF', '22C55E'][i % 4]}&color=fff`,
}));

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const users = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">User Management</h1>
            <p className="text-[#B6BDC9] text-sm mt-1">{MOCK_USERS.length} registered users</p>
          </div>
        </div>

        <div className="relative max-w-sm">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BDC9]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-[#B6BDC9] text-sm focus:outline-none focus:border-[#FF4D6D]"
          />
        </div>

        <div className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['User', 'Role', 'Joined', 'Tickets', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#B6BDC9] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl" />
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-[#B6BDC9]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={user.role === 'admin' ? 'pink' : 'gray'} className="capitalize">{user.role}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#B6BDC9]">{user.joined}</td>
                    <td className="px-4 py-3 text-sm font-mono text-white">{user.tickets}</td>
                    <td className="px-4 py-3">
                      <Badge color={user.status === 'active' ? 'green' : 'danger'} className="capitalize">{user.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-[#00D4FF] hover:bg-white/10 transition-all" title="Verify">
                          <MdVerified size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-[#EF4444] hover:bg-white/10 transition-all" title="Suspend">
                          <MdBlock size={16} />
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

export default AdminUsers;
