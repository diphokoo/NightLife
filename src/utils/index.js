import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';

export const formatDate = (date, fmt = 'EEE, dd MMM yyyy') => {
  try { return format(parseISO(date), fmt); }
  catch { return format(new Date(date), fmt); }
};

export const formatTime = (date) => {
  try { return format(parseISO(date), 'HH:mm'); }
  catch { return format(new Date(date), 'HH:mm'); }
};

export const formatRelative = (date) => {
  try { return formatDistanceToNow(parseISO(date), { addSuffix: true }); }
  catch { return formatDistanceToNow(new Date(date), { addSuffix: true }); }
};

export const isUpcoming = (date) => isAfter(new Date(date), new Date());
export const isPast = (date) => isBefore(new Date(date), new Date());

export const formatCurrency = (amount, currency = 'ZAR') => {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

export const formatPercentage = (value, decimals = 1) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;

export const truncate = (str, len = 100) =>
  str && str.length > len ? `${str.slice(0, len)}...` : str;

export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getInitials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const getOccupancyColor = (rate) => {
  if (rate >= 90) return '#EF4444';
  if (rate >= 70) return '#F59E0B';
  if (rate >= 50) return '#22C55E';
  return '#00D4FF';
};

export const getStatusColor = (status) => {
  const map = {
    published: '#22C55E',
    featured: '#FF4D6D',
    draft: '#B6BDC9',
    archived: '#F59E0B',
    cancelled: '#EF4444',
  };
  return map[status] || '#B6BDC9';
};
