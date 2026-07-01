import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  MdAdd, MdEdit, MdDelete, MdMoreVert, MdSearch, MdStar,
  MdArchive, MdFileCopy,
} from 'react-icons/md';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { eventService } from '../../services/eventService';
import { formatDate, formatCurrency } from '../../utils';
import { SA_CITIES, EVENT_CATEGORIES } from '../../constants';

const statusBadgeColor = { published: 'green', featured: 'pink', draft: 'gray', archived: 'orange', cancelled: 'danger' };

const EventFormModal = ({ isOpen, onClose, event, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: event || { status: 'published', price: 0, currency: 'ZAR' },
  });

  useEffect(() => { if (event) reset(event); else reset({ status: 'published', price: 0, currency: 'ZAR' }); }, [event, reset]);

  const onSubmit = async (data) => {
    await onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={event ? 'Edit Event' : 'Create Event'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Event Title" placeholder="e.g. Amapiano Nights" error={errors.title?.message}
            {...register('title', { required: 'Title is required' })} />
          <Input label="Artist / Performer" placeholder="e.g. Black Coffee"
            {...register('artist')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#B6BDC9]">City</label>
            <select {...register('city', { required: true })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF4D6D]">
              {SA_CITIES.map(c => <option key={c} value={c} className="bg-[#121826]">{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#B6BDC9]">Category</label>
            <select {...register('category', { required: true })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF4D6D]">
              {EVENT_CATEGORIES.map(c => <option key={c.id} value={c.id} className="bg-[#121826]">{c.icon} {c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Date" type="date" error={errors.date?.message}
            {...register('date', { required: 'Date is required' })} />
          <Input label="Start Time" type="time" {...register('time')} />
          <Input label="End Time" type="time" {...register('endTime')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Venue Name" placeholder="e.g. The Dome" {...register('venue')} />
          <Input label="Price (ZAR)" type="number" min="0" placeholder="0 for free"
            {...register('price', { valueAsNumber: true })} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#B6BDC9]">Description</label>
          <textarea
            rows={3}
            placeholder="Describe the event..."
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#B6BDC9] text-sm focus:outline-none focus:border-[#FF4D6D] resize-none"
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#B6BDC9]">Status</label>
            <select {...register('status')} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF4D6D]">
              {['published', 'draft', 'featured', 'archived', 'cancelled'].map(s => (
                <option key={s} value={s} className="bg-[#121826] capitalize">{s}</option>
              ))}
            </select>
          </div>
          <Input label="Cover Image URL" placeholder="https://..." {...register('image')} />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
          <Button type="submit" variant="primary" loading={isSubmitting} fullWidth>
            {event ? 'Save Changes' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionMenu, setActionMenu] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await eventService.getAll({ search, status: statusFilter || undefined, page, limit: 10 });
      setEvents(res.events);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const handleSave = async (data) => {
    if (editEvent) await eventService.update(editEvent.id, data);
    else await eventService.create(data);
    fetchEvents();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await eventService.delete(deleteId);
    setDeleteId(null);
    fetchEvents();
  };

  const openEdit = (event) => { setEditEvent(event); setModalOpen(true); setActionMenu(null); };
  const openCreate = () => { setEditEvent(null); setModalOpen(true); };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Event Management</h1>
            <p className="text-[#B6BDC9] text-sm mt-1">{total} total events</p>
          </div>
          <Button variant="primary" icon={<MdAdd size={18} />} onClick={openCreate}>New Event</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BDC9]" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search events..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-[#B6BDC9] text-sm focus:outline-none focus:border-[#FF4D6D]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FF4D6D]"
          >
            <option value="" className="bg-[#121826]">All Status</option>
            {['published', 'featured', 'draft', 'archived', 'cancelled'].map(s => (
              <option key={s} value={s} className="bg-[#121826] capitalize">{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Event', 'Date', 'City', 'Price', 'Attendance', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#B6BDC9] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 bg-white/5 rounded skeleton" /></td>
                      ))}
                    </tr>
                  ))
                ) : events.length === 0 ? (
                  <tr><td colSpan={7}><EmptyState type="events" /></td></tr>
                ) : (
                  events.map(event => (
                    <tr key={event.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={event.image} alt={event.title} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate max-w-[180px]">{event.title}</p>
                            <p className="text-xs text-[#B6BDC9] truncate">{event.artist}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#B6BDC9] whitespace-nowrap">{formatDate(event.date, 'dd MMM yy')}</td>
                      <td className="px-4 py-3 text-sm text-[#B6BDC9]">{event.city}</td>
                      <td className="px-4 py-3 text-sm font-mono text-[#FF4D6D]">{formatCurrency(event.price)}</td>
                      <td className="px-4 py-3 text-sm font-mono text-white">{event.attendance?.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <Badge color={statusBadgeColor[event.status] || 'gray'} className="capitalize">{event.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button
                            onClick={() => setActionMenu(actionMenu === event.id ? null : event.id)}
                            className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
                          >
                            <MdMoreVert size={18} />
                          </button>
                          <AnimatePresence>
                            {actionMenu === event.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 top-full mt-1 w-44 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 p-1"
                              >
                                {[
                                  { icon: MdEdit, label: 'Edit', action: () => openEdit(event) },
                                  { icon: MdStar, label: 'Feature', action: () => { eventService.update(event.id, { isFeatured: !event.isFeatured }); fetchEvents(); setActionMenu(null); } },
                                  { icon: MdFileCopy, label: 'Duplicate', action: () => { eventService.create({ ...event, title: `${event.title} (Copy)`, id: undefined }); fetchEvents(); setActionMenu(null); } },
                                  { icon: MdArchive, label: 'Archive', action: () => { eventService.update(event.id, { status: 'archived' }); fetchEvents(); setActionMenu(null); } },
                                  { icon: MdDelete, label: 'Delete', action: () => { setDeleteId(event.id); setActionMenu(null); }, danger: true },
                                ].map(({ icon: Icon, label, action, danger }) => (
                                  <button key={label} onClick={action} className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${danger ? 'text-[#EF4444] hover:bg-[#EF4444]/10' : 'text-[#B6BDC9] hover:text-white hover:bg-white/10'}`}>
                                    <Icon size={15} /> {label}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
      </div>

      {/* Create/Edit modal */}
      <EventFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        event={editEvent}
        onSave={handleSave}
      />

      {/* Delete confirm modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Event" size="sm">
        <div className="p-6 text-center">
          <div className="text-4xl mb-3">🗑️</div>
          <p className="text-white mb-2">Are you sure you want to delete this event?</p>
          <p className="text-sm text-[#B6BDC9] mb-6">This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" fullWidth onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default AdminEvents;
