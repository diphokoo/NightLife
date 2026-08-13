import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdSearch, MdVerified, MdBlock } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { userService } from '../../services/userService';

const getInitials = (name = '') =>
  name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

const AdminUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAllUsers()
      .then(setAllUsers)
      .finally(() => setLoading(false));
  }, []);

  const users = allUsers.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">User Management</h1>
            <p className="text-[#B6BDC9] text-sm mt-1">{allUsers.length} registered users</p>
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
                  {['User', 'Role', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#B6BDC9] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 bg-white/5 rounded skeleton" /></td>
                      ))}
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr><td colSpan={5}><EmptyState type="users" title="No users found" /></td></tr>
                ) : (
                  users.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4D6D] to-[#7C5CFF] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">{getInitials(user.name)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{user.name || '—'}</p>
                            <p className="text-xs text-[#B6BDC9]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge color={user.role === 'admin' ? 'pink' : 'gray'} className="capitalize">{user.role || 'user'}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#B6BDC9]">
                        {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge color={user.status === 'suspended' ? 'danger' : 'green'} className="capitalize">
                          {user.status || 'active'}
                        </Badge>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
