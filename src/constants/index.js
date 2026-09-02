export const COLORS = {
  pink: '#FF4D6D',
  cyan: '#00D4FF',
  purple: '#7C5CFF',
  green: '#22C55E',
  orange: '#F59E0B',
  danger: '#EF4444',
};

export const SA_CITIES = [
  'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Soweto',
  'Port Elizabeth', 'Bloemfontein', 'East London', 'Polokwane', 'Nelspruit',
  'Kimberley', 'Rustenburg', 'Pietermaritzburg', 'Stellenbosch', 'George', 'Knysna',
];

export const EVENT_CATEGORIES = [
  { id: 'music', label: 'Clubs', icon: '🎵', color: '#FF4D6D' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌙', color: '#7C5CFF' },
  { id: 'festivals', label: 'Festivals', icon: '🎪', color: '#F59E0B' },
  { id: 'arts', label: 'Arts & Culture', icon: '🎨', color: '#00D4FF' },
  { id: 'food', label: 'Food & Drink', icon: '🍷', color: '#FF4D6D' },
];

export const MUSIC_GENRES = [
  'Amapiano', 'Afrobeats', 'House', 'Hip-Hop', 'R&B', 'Jazz',
  'Rock', 'Pop', 'Electronic', 'Kwaito', 'Gospel', 'Classical',
];

export const TICKET_TYPES = ['Free', 'Paid', 'VIP', 'Early Bird', 'Group'];

export const EVENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  FEATURED: 'featured',
  ARCHIVED: 'archived',
  CANCELLED: 'cancelled',
};

export const ROUTES = {
  HOME: '/',
  EVENTS: '/events',
  EVENT_DETAIL: '/events/:id',
  SEARCH: '/search',
  CITIES: '/cities',
  CATEGORIES: '/categories',
  TICKETS: '/tickets',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  ADMIN_EVENTS: '/admin/events',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_VENUES: '/admin/venues',
  ADMIN_USERS: '/admin/users',
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
};
