import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdExplore } from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-8xl font-display font-bold text-white/10">404</p>
        <h1 className="text-2xl font-bold text-white mt-2 mb-1">Page Not Found</h1>
        <p className="text-[#B6BDC9] mb-6">The page you're looking for doesn't exist.</p>
        <Button variant="secondary" onClick={() => setOpen(true)}>Browse Events</Button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#121826] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-all"
              >
                <MdClose size={18} />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF4D6D] to-[#7C5CFF] flex items-center justify-center mx-auto mb-4">
                <MdExplore size={32} className="text-white" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">Looks like you're lost</h2>
              <p className="text-[#B6BDC9] text-sm mb-6">
                This page doesn't exist. Discover upcoming events happening near you instead.
              </p>

              <div className="flex flex-col gap-3">
                <Button variant="primary" fullWidth icon={<MdExplore size={18} />} onClick={() => navigate('/events')}>
                  View Events
                </Button>
                <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
                  Go Home
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default NotFoundPage;
