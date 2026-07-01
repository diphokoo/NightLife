import { motion } from 'framer-motion';
import { MdSearchOff, MdEventBusy, MdErrorOutline, MdWifiOff } from 'react-icons/md';
import Button from './Button';

const configs = {
  search: {
    icon: <MdSearchOff size={56} className="text-[#B6BDC9]" />,
    title: 'No results found',
    message: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
  events: {
    icon: <MdEventBusy size={56} className="text-[#B6BDC9]" />,
    title: 'No events yet',
    message: 'There are no events in this category right now. Check back soon!',
  },
  error: {
    icon: <MdErrorOutline size={56} className="text-[#EF4444]" />,
    title: 'Something went wrong',
    message: 'We encountered an error. Please try again.',
  },
  offline: {
    icon: <MdWifiOff size={56} className="text-[#B6BDC9]" />,
    title: 'No connection',
    message: 'Check your internet connection and try again.',
  },
};

const EmptyState = ({ type = 'events', title, message, action, actionLabel = 'Try again' }) => {
  const config = configs[type] || configs.events;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="mb-4"
      >
        {config.icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">{title || config.title}</h3>
      <p className="text-[#B6BDC9] text-sm max-w-sm mb-6">{message || config.message}</p>
      {action && (
        <Button onClick={action} variant="secondary" size="sm">{actionLabel}</Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
