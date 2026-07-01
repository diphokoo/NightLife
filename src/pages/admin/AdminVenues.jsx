import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdEdit, MdDelete, MdLocationOn, MdPeople } from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import { mockVenues } from '../../services/mockData';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { formatNumber } from '../../utils';

const AdminVenues = () => {
  const [venues] = useState(mockVenues);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Venue Management</h1>
            <p className="text-[#B6BDC9] text-sm mt-1">{venues.length} venues registered</p>
          </div>
          <Button variant="primary" icon={<MdAdd size={18} />} onClick={() => setModalOpen(true)}>Add Venue</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue, i) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#121826] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF4D6D]/15 flex items-center justify-center">
                  <MdLocationOn size={20} className="text-[#FF4D6D]" />
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"><MdEdit size={16} /></button>
                  <button className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-[#EF4444] hover:bg-white/10 transition-all"><MdDelete size={16} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-white mb-1">{venue.name}</h3>
              <p className="text-sm text-[#B6BDC9] flex items-center gap-1 mb-3">
                <MdLocationOn size={14} /> {venue.city}
              </p>
              <div className="flex items-center gap-1.5 text-sm text-[#B6BDC9]">
                <MdPeople size={14} />
                <span>Capacity: <span className="text-white font-mono">{formatNumber(venue.capacity)}</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Venue" size="sm">
        <div className="p-6 space-y-4">
          {['Venue Name', 'City', 'Address', 'Capacity'].map(field => (
            <div key={field} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#B6BDC9]">{field}</label>
              <input
                type={field === 'Capacity' ? 'number' : 'text'}
                placeholder={field}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#B6BDC9] text-sm focus:outline-none focus:border-[#FF4D6D]"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" fullWidth onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" fullWidth onClick={() => setModalOpen(false)}>Add Venue</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default AdminVenues;
