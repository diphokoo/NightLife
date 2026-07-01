// Mock data for development — replace with real Firebase queries in production
import { SA_CITIES, EVENT_CATEGORIES } from '../constants';

const UNSPLASH_EVENTS = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
  'https://images.unsplash.com/photo-1598387993441-a364f854cfbd?w=800&q=80',
  'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=800&q=80',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
];

const VENUES = [
  { id: 'v1', name: 'The Dome', city: 'Johannesburg', capacity: 8000 },
  { id: 'v2', name: 'Cape Town Stadium', city: 'Cape Town', capacity: 55000 },
  { id: 'v3', name: 'Moses Mabhida Stadium', city: 'Durban', capacity: 56000 },
  { id: 'v4', name: 'Loftus Versfeld', city: 'Pretoria', capacity: 51762 },
  { id: 'v5', name: 'Grand Arena', city: 'Cape Town', capacity: 20000 },
  { id: 'v6', name: 'Emperors Palace', city: 'Johannesburg', capacity: 5000 },
  { id: 'v7', name: 'Shimmy Beach Club', city: 'Cape Town', capacity: 2000 },
  { id: 'v8', name: 'Bassline', city: 'Johannesburg', capacity: 1500 },
];

const ARTISTS = [
  'Black Coffee', 'Nasty C', 'Sho Madjozi', 'Focalistic', 'Ami Faku',
  'Tresor', 'Samthing Soweto', 'Msaki', 'Tyla', 'Kabza De Small',
  'DJ Maphorisa', 'Burna Boy', 'Wizkid', 'Davido', 'Riky Rick',
];

const generateEvents = () => {
  const events = [];
  const now = new Date();

  for (let i = 1; i <= 48; i++) {
    const category = EVENT_CATEGORIES[i % EVENT_CATEGORIES.length];
    const venue = VENUES[i % VENUES.length];
    const daysOffset = Math.floor(Math.random() * 90) - 10;
    const eventDate = new Date(now);
    eventDate.setDate(eventDate.getDate() + daysOffset);

    const basePrice = [0, 150, 250, 350, 500, 750, 1000, 1500][i % 8];
    const attendance = Math.floor(Math.random() * venue.capacity * 0.9) + 100;

    events.push({
      id: `event-${i}`,
      title: getEventTitle(i, category),
      description: getEventDescription(category),
      category: category.id,
      categoryLabel: category.label,
      categoryColor: category.color,
      categoryIcon: category.icon,
      artist: ARTISTS[i % ARTISTS.length],
      venue: venue.name,
      venueId: venue.id,
      city: venue.city,
      address: `${venue.name}, ${venue.city}, South Africa`,
      date: eventDate.toISOString(),
      time: ['18:00', '19:00', '20:00', '21:00', '22:00'][i % 5],
      endTime: ['22:00', '23:00', '00:00', '02:00', '04:00'][i % 5],
      image: UNSPLASH_EVENTS[i % UNSPLASH_EVENTS.length],
      gallery: UNSPLASH_EVENTS.slice(0, 4),
      price: basePrice,
      priceVIP: basePrice > 0 ? basePrice * 2.5 : 0,
      currency: 'ZAR',
      ticketsAvailable: Math.floor(Math.random() * 500) + 50,
      ticketsTotal: 1000,
      attendance,
      capacity: venue.capacity,
      occupancyRate: Math.round((attendance / venue.capacity) * 100),
      isFeatured: i <= 6,
      isTrending: i % 4 === 0,
      isFree: basePrice === 0,
      isIndoor: i % 3 !== 0,
      isFamilyFriendly: category.id === 'arts',
      status: daysOffset > -5 ? 'published' : 'archived',
      organizer: {
        name: `${venue.city} Events Co.`,
        avatar: `https://ui-avatars.com/api/?name=${venue.city}&background=FF4D6D&color=fff`,
        verified: i % 3 === 0,
      },
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      reviewCount: Math.floor(Math.random() * 200) + 10,
      popularityScore: Math.floor(Math.random() * 40) + 60,
      tags: [category.label, venue.city, 'South Africa'],
      createdAt: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return events;
};

function getEventTitle(i, category) {
  const titles = {
    music: ['Amapiano Nights', 'Afrobeats Festival', 'Jazz Under the Stars', 'House Music Marathon', 'Kwaito Classics'],
    nightlife: ['Neon Rave', 'Midnight Masquerade', 'Club Fusion Night', 'VIP Rooftop Party', 'Electric Sundown'],
    festivals: ['Cape Town Carnival', 'Joburg Arts Fest', 'Durban July', 'Oppikoppi', 'Splashy Fen'],
    arts: ['Gallery Opening Night', 'Street Art Tour', 'Photography Exhibition', 'Sculpture Garden', 'Film Premiere'],
    food: ['Wine & Dine Festival', 'Braai Masters', 'Street Food Market', 'Craft Beer Fest', 'Chef\'s Table'],
  };
  const list = titles[category.id] || titles.music;
  return list[i % list.length];
}

function getEventDescription(category) {
  return `Experience an unforgettable ${category.label} event in the heart of South Africa. 
Join thousands of passionate fans for a world-class experience featuring top local and international talent. 
This premium event promises exceptional entertainment, stunning production, and memories that will last a lifetime. 
Don't miss out on one of South Africa's most anticipated events of the year.`;
}

export const mockEvents = generateEvents();

export const mockVenues = VENUES;

export const mockStats = {
  totalEvents: 248,
  totalRevenue: 1847500,
  totalAttendance: 94320,
  totalUsers: 12847,
  growthRate: 23.5,
  revenueGrowth: 18.2,
  attendanceGrowth: 31.4,
  userGrowth: 15.8,
};

export const mockRevenueData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  revenue: Math.floor(Math.random() * 200000) + 80000,
  tickets: Math.floor(Math.random() * 2000) + 500,
}));

export const mockAttendanceData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],
  attendance: Math.floor(Math.random() * 5000) + 1000,
  capacity: 8000,
}));

export const mockCityData = SA_CITIES.slice(0, 6).map(city => ({
  city,
  events: Math.floor(Math.random() * 50) + 10,
  attendance: Math.floor(Math.random() * 20000) + 5000,
  revenue: Math.floor(Math.random() * 500000) + 100000,
}));

export const mockHourlyAttendance = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  count: i >= 18 ? Math.floor(Math.random() * 3000) + 500 : Math.floor(Math.random() * 200),
}));
