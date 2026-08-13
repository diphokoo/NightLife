import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = lazy(() => import('../pages/HomePage'));
const EventsPage = lazy(() => import('../pages/EventsPage'));
const EventDetailPage = lazy(() => import('../pages/EventDetailPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const CitiesPage = lazy(() => import('../pages/CitiesPage'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const InterestsPage = lazy(() => import('../pages/InterestsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminEvents = lazy(() => import('../pages/admin/AdminEvents'));
const AdminAnalytics = lazy(() => import('../pages/admin/AdminAnalytics'));
const AdminVenues = lazy(() => import('../pages/admin/AdminVenues'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminTickets = lazy(() => import('../pages/admin/AdminTickets'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4D6D] to-[#7C5CFF] flex items-center justify-center animate-pulse">
        <span className="text-white font-bold text-xl">P</span>
      </div>
      <div className="w-6 h-6 border-2 border-[#FF4D6D] border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/cities" element={<CitiesPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/interests" element={<InterestsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/events" element={<AdminRoute><AdminEvents /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
      <Route path="/admin/venues" element={<AdminRoute><AdminVenues /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
