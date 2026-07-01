import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import BottomNav from '../components/navigation/BottomNav';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-[#0B0F19] flex flex-col">
    <Navbar />
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 pt-16 pb-20 md:pb-0"
    >
      {children}
    </motion.main>
    <Footer />
    <BottomNav />
  </div>
);

export default MainLayout;
