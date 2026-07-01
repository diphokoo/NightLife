import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const Drawer = ({ isOpen, onClose, title, children, side = 'right', width = 'w-80' }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const variants = {
    right: { hidden: { x: '100%' }, visible: { x: 0 } },
    left: { hidden: { x: '-100%' }, visible: { x: 0 } },
    bottom: { hidden: { y: '100%' }, visible: { y: 0 } },
  };

  const positionClass = {
    right: 'right-0 top-0 h-full',
    left: 'left-0 top-0 h-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={variants[side].hidden}
            animate={variants[side].visible}
            exit={variants[side].hidden}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`absolute ${positionClass[side]} ${width} bg-[#0F172A] border-l border-white/10 flex flex-col shadow-2xl`}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <h3 className="font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#B6BDC9] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close drawer"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
