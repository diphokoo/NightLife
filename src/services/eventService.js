import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const EVENTS = 'events';

const applyClientFilters = (events, filters) => {
  let result = [...events];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(e =>
      e.title?.toLowerCase().includes(q) ||
      e.artist?.toLowerCase().includes(q) ||
      e.venue?.toLowerCase().includes(q) ||
      e.city?.toLowerCase().includes(q) ||
      e.categoryLabel?.toLowerCase().includes(q)
    );
  }
  if (filters.minPrice !== undefined) result = result.filter(e => e.price >= filters.minPrice);
  if (filters.maxPrice !== undefined) result = result.filter(e => e.price <= filters.maxPrice);
  if (filters.isFree !== undefined) result = result.filter(e => e.isFree === filters.isFree);
  if (filters.city) result = result.filter(e => e.city === filters.city);
  if (filters.category) result = result.filter(e => e.category === filters.category);
  if (filters.status) result = result.filter(e => e.status === filters.status);
  if (filters.isFeatured) result = result.filter(e => e.isFeatured === true);
  if (filters.isTrending) result = result.filter(e => e.isTrending === true);

  if (filters.sortBy === 'date') result.sort((a, b) => new Date(a.date) - new Date(b.date));
  else if (filters.sortBy === 'price') result.sort((a, b) => (a.price || 0) - (b.price || 0));
  else if (filters.sortBy === 'popularity') result.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
  else result.sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt));

  return result;
};

const snapToDocs = (snapshot) =>
  snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

export const isEventPassed = (event) => {
  if (!event?.date) return false;
  const eventDate = new Date(event.date);
  if (event.endTime) {
    const [h, m] = event.endTime.split(':').map(Number);
    eventDate.setHours(h, m, 0, 0);
  } else {
    eventDate.setHours(23, 59, 59, 999);
  }
  return eventDate < new Date();
};

export const eventService = {
  async getAll(filters = {}) {
    const snapshot = await getDocs(collection(db, EVENTS));
    let events = applyClientFilters(snapToDocs(snapshot), filters);
    const page = filters.page || 1;
    const pageLimit = filters.limit || 12;
    const start = (page - 1) * pageLimit;
    return {
      events: events.slice(start, start + pageLimit),
      total: events.length,
      page,
      totalPages: Math.ceil(events.length / pageLimit) || 1,
    };
  },

  async getById(id) {
    const snap = await getDoc(doc(db, EVENTS, id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  async getFeatured() {
    const q = query(collection(db, EVENTS), where('isFeatured', '==', true), limit(6));
    return snapToDocs(await getDocs(q)).filter(e => !isEventPassed(e));
  },

  async getTrending() {
    const q = query(collection(db, EVENTS), where('isTrending', '==', true), limit(8));
    return snapToDocs(await getDocs(q)).filter(e => !isEventPassed(e));
  },

  async getUpcoming() {
    const now = new Date().toISOString();
    const q = query(collection(db, EVENTS), where('date', '>=', now), orderBy('date'), limit(8));
    return snapToDocs(await getDocs(q));
  },

  async getRelated(event) {
    const q = query(collection(db, EVENTS), where('category', '==', event.category), limit(5));
    return snapToDocs(await getDocs(q)).filter(e => e.id !== event.id).slice(0, 4);
  },

  async getByIds(ids) {
    if (!ids?.length) return [];
    const all = snapToDocs(await getDocs(collection(db, EVENTS)));
    return all.filter(e => ids.includes(e.id));
  },

  async search(queryStr) {
    if (!queryStr || queryStr.length < 2) return [];
    const all = snapToDocs(await getDocs(collection(db, EVENTS)));
    const q = queryStr.toLowerCase();
    return all.filter(e =>
      e.title?.toLowerCase().includes(q) ||
      e.artist?.toLowerCase().includes(q) ||
      e.venue?.toLowerCase().includes(q) ||
      e.city?.toLowerCase().includes(q)
    ).slice(0, 8);
  },

  async create(data) {
    const payload = {
      ...data,
      isFree: (data.price || 0) === 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const ref = await addDoc(collection(db, EVENTS), payload);
    return { id: ref.id, ...payload };
  },

  async update(id, data) {
    await updateDoc(doc(db, EVENTS, id), { ...data, updatedAt: serverTimestamp() });
    return { id, ...data };
  },

  async delete(id) {
    await deleteDoc(doc(db, EVENTS, id));
    return true;
  },
};

export const analyticsService = {
  async getStats() {
    const eventsSnap = await getDocs(collection(db, EVENTS));
    const usersSnap = await getDocs(collection(db, 'users'));
    return {
      totalEvents: eventsSnap.size,
      totalUsers: usersSnap.size,
      totalRevenue: 0,
      totalAttendance: 0,
      growthRate: 0,
      revenueGrowth: 0,
      attendanceGrowth: 0,
      userGrowth: 0,
    };
  },
  async getRevenue() { return []; },
  async getAttendance() { return []; },
  async getCityData() {
    const snap = await getDocs(collection(db, EVENTS));
    const events = snapToDocs(snap);
    const cityMap = {};
    events.forEach(e => {
      if (!e.city) return;
      if (!cityMap[e.city]) cityMap[e.city] = { city: e.city, events: 0, attendance: 0, revenue: 0 };
      cityMap[e.city].events++;
      cityMap[e.city].attendance += e.attendance || 0;
      cityMap[e.city].revenue += e.price || 0;
    });
    return Object.values(cityMap);
  },
};
