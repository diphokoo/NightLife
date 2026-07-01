import { classNames } from '../../utils';

const colorMap = {
  pink: 'bg-[#FF4D6D]/20 text-[#FF4D6D] border-[#FF4D6D]/30',
  cyan: 'bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/30',
  purple: 'bg-[#7C5CFF]/20 text-[#7C5CFF] border-[#7C5CFF]/30',
  green: 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/30',
  orange: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30',
  danger: 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30',
  gray: 'bg-white/10 text-[#B6BDC9] border-white/10',
};

const Badge = ({ children, color = 'pink', icon, className = '' }) => (
  <span className={classNames(
    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
    colorMap[color] || colorMap.gray,
    className
  )}>
    {icon && <span>{icon}</span>}
    {children}
  </span>
);

export default Badge;
