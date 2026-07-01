// Event service — wraps mock data with Firebase-ready interface
import { mockEvents, mockVenues, mockStats, mockRevenueData, mockAttendanceData, mockCityData } from './mockData';

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const eventService = {
  async getAll(filters = {}) {
    await delay();
    let events = [...mockEvents];

    if (filters.city) events = events.filter(e => e.city === filters.city);
    if (filters.category) events = events.filter(e => e.category === filters.category);
    if (filters.isFree !== undefined) events = events.filter(e => e.isFree === filters.isFree);
    if (filters.isFeatured) events = events.filter(e => e.isFeatured);
    if (filters.isTrending) events = events.filter(e => e.isTrending);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      events = events.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.artist.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.categoryLabel.toLowerCase().includes(q)
      );
    }
    if (filters.minPrice !== undefined) events = events.filter(e => e.price >= filters.minPrice);
    if (filters.maxPrice !== undefined) events = events.filter(e => e.price <= filters.maxPrice);
    if (filters.status) events = events.filter(e => e.status === filters.status);

    // Sort
    if (filters.sortBy === 'date') events.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (filters.sortBy === 'price') events.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'popularity') events.sort((a, b) => b.popularityScore - a.popularityScore);
    else events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const start = (page - 1) * limit;

    return {
      events: events.slice(start, start + limit),
      total: events.length,
      page,
      totalPages: Math.ceil(events.length / limit),
    };
  },

  async getById(id) {
    await delay(200);
    return mockEvents.find(e => e.id === id) || null;
  },

  async getFeatured() {
    await delay(200);
    return mockEvents.filter(e => e.isFeatured).slice(0, 6);
  },

  async getTrending() {
    await delay(200);
    return mockEvents.filter(e => e.isTrending).slice(0, 8);
  },

  async getUpcoming() {
    await delay(200);
    const now = new Date();
    return mockEvents
      .filter(e => new Date(e.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 8);
  },

  async getRelated(event) {
    await delay(200);
    return mockEvents
      .filter(e => e.id !== event.id && (e.category === event.category || e.city === event.city))
      .slice(0, 4);
  },

  async search(query) {
    await delay(150);
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return mockEvents
      .filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.artist.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q)
      )
      .slice(0, 8);
  },

  async create(data) {
    await delay(500);
    const newEvent = { ...data, id: `event-${Date.now()}`, createdAt: new Date().toISOString() };
    mockEvents.unshift(newEvent);
    return newEvent;
  },

  async update(id, data) {
    await delay(400);
    const idx = mockEvents.findIndex(e => e.id === id);
    if (idx !== -1) mockEvents[idx] = { ...mockEvents[idx], ...data };
    return mockEvents[idx];
  },

  async delete(id) {
    await delay(300);
    const idx = mockEvents.findIndex(e => e.id === id);
    if (idx !== -1) mockEvents.splice(idx, 1);
    return true;
  },
};

export const venueService = {
  async getAll() {
    await delay(200);
    return mockVenues;
  },
};

export const analyticsService = {
  async getStats() {
    await delay(300);
    return mockStats;
  },
  async getRevenue() {
    await delay(300);
    return mockRevenueData;
  },
  async getAttendance() {
    await delay(300);
    return mockAttendanceData;
  },
  async getCityData() {
    await delay(300);
    return mockCityData;
  },
};
