import { classNames } from '../../utils';

const Tabs = ({ tabs, activeTab, onChange, className = '' }) => (
  <div className={classNames('flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10', className)}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={classNames(
          'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          activeTab === tab.id
            ? 'bg-[#FF4D6D] text-white shadow-lg'
            : 'text-[#B6BDC9] hover:text-white hover:bg-white/10'
        )}
      >
        {tab.icon && <span>{tab.icon}</span>}
        {tab.label}
        {tab.count !== undefined && (
          <span className={classNames(
            'px-1.5 py-0.5 rounded-full text-xs',
            activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
          )}>
            {tab.count}
          </span>
        )}
      </button>
    ))}
  </div>
);

export default Tabs;
