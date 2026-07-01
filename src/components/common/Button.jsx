import { motion } from 'framer-motion';
import { classNames } from '../../utils';

const sizes = {
  xs: 'px-3 py-1.5 text-xs rounded-lg',
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
};

const variants = {
  primary: 'bg-[#FF4D6D] text-white hover:bg-[#e63d5a] shadow-lg hover:shadow-[0_0_20px_rgba(255,77,109,0.4)]',
  secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
  outline: 'border border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white',
  ghost: 'text-[#B6BDC9] hover:text-white hover:bg-white/10',
  cyan: 'bg-[#00D4FF] text-[#0B0F19] hover:bg-[#00bfe8] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]',
  purple: 'bg-[#7C5CFF] text-white hover:bg-[#6a4de8] shadow-lg hover:shadow-[0_0_20px_rgba(124,92,255,0.4)]',
  danger: 'bg-[#EF4444] text-white hover:bg-[#dc2626]',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none',
        sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      {children}
      {!loading && iconRight}
    </motion.button>
  );
};

export default Button;
