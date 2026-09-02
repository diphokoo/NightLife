import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { InterestProvider } from './contexts/InterestContext';
import { useAuth } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

const ConnectionErrorHandler = () => {
  const { connectionError, clearConnectionError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connectionError) return;
    toast.error(connectionError, { duration: 6000, id: 'connection-error' });
    clearConnectionError();
    navigate('/', { replace: true });
  }, [connectionError, clearConnectionError, navigate]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          <InterestProvider>
            <ConnectionErrorHandler />
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#121826',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '14px',
                },
                success: { iconTheme: { primary: '#22C55E', secondary: '#fff' } },
                error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
              }}
            />
          </InterestProvider>
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
