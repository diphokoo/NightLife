import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
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
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
