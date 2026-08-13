import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdEdit, MdDelete, MdLocationOn, MdPeople } from 'react-icons/md';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../layouts/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { formatNumber } from '../../utils';

const AdminVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', address: '', capacity: '' });
  const [saving, setSaving] = useState(false);

  const fetchVenues = () => {
    getDocs(collection(db, 'venues'))
      .then(snap => setVenues(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchVenues(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.city) return;
    setSaving(true);
    await addDoc(collection(db, 'venues'), {
      ...form,
      capacity: Number(form.capacity) || 0,
      createdAt: serverTimestamp(),
    });
    setForm({ name: '', city: '', address: '', capacity: '' });
    setModalOpen(false);
    setSaving(false);
    fetchVenues();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'venues', id));
    setVenues(prev => prev.filter(v => v.id !== id));
  };

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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-40 bg-white/5 rounded-2xl skeleton" />)}
          </div>
        ) : venues.length === 0 ? (
          <EmptyState type="events" title="No venues yet" message="Add your first venue to get started." action={() => setModalOpen(true)} actionLabel="Add Venue" />
        ) : (
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
                    <button onClick={() => handleDelete(venue.id)} className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-[#EF4444] hover:bg-white/10 transition-all"><MdDelete size={16} /></button>
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-1">{venue.name}</h3>
                <p className="text-sm text-[#B6BDC9] flex items-center gap-1 mb-3">
                  <MdLocationOn size={14} /> {venue.city}
                </p>
                {venue.capacity > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-[#B6BDC9]">
                    <MdPeople size={14} />
                    <span>Capacity: <span className="text-white font-mono">{formatNumber(venue.capacity)}</span></span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Venue" size="sm">
        <div className="p-6 space-y-4">
          {[
            { key: 'name', label: 'Venue Name', type: 'text' },
            { key: 'city', label: 'City', type: 'text' },
            { key: 'address', label: 'Address', type: 'text' },
            { key: 'capacity', label: 'Capacity', type: 'number' },
          ].map(({ key, label, type }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#B6BDC9]">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={label}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#B6BDC9] text-sm focus:outline-none focus:border-[#FF4D6D]"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" fullWidth onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" fullWidth loading={saving} onClick={handleAdd}>Add Venue</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default AdminVenues;
