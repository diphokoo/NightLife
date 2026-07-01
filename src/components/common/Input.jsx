import { forwardRef } from 'react';
import { classNames } from '../../utils';

const Input = forwardRef(({
  label,
  error,
  hint,
  icon,
  iconRight,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={classNames('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-[#B6BDC9]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BDC9]">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={classNames(
            'w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-[#B6BDC9]',
            'focus:outline-none focus:ring-1 transition-all duration-200 text-sm',
            error
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]'
              : 'border-white/10 focus:border-[#FF4D6D] focus:ring-[#FF4D6D]',
            icon && 'pl-10',
            iconRight && 'pr-10',
            className
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B6BDC9]">
            {iconRight}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
      {hint && !error && <p className="text-xs text-[#B6BDC9]">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
