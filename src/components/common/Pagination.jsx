import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { classNames } from '../../utils';

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1;
    if (page <= 4) return i + 1;
    if (page >= totalPages - 3) return totalPages - 6 + i;
    return page - 3 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#B6BDC9] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <MdChevronLeft size={20} />
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={classNames(
            'w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200',
            p === page
              ? 'bg-[#FF4D6D] text-white shadow-lg'
              : 'bg-white/5 border border-white/10 text-[#B6BDC9] hover:text-white hover:bg-white/10'
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#B6BDC9] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <MdChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
