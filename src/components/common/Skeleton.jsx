// Skeleton loading components
import { classNames } from '../../utils';

const Skeleton = ({ className = '', rounded = 'rounded-lg' }) => (
  <div className={classNames(
    'skeleton bg-white/5',
    rounded,
    className
  )} />
);

export const SkeletonCard = () => (
  <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
    <Skeleton className="h-48 w-full" rounded="rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex justify-between pt-1">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

export const SkeletonHero = () => (
  <div className="relative h-[70vh] bg-white/5 skeleton rounded-none" />
);

export default Skeleton;
