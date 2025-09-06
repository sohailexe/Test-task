import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
type NotificationIconProps = {
  count: number;
  max?: number;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | null | undefined;
  loading?: boolean;
};
const NotificationIcon = ({
  count,
  max = 3,
  onClick,
  className,
  loading,
  variant = 'default',
}: NotificationIconProps) => {
  // Format the count display (e.g., "99+" for numbers greater than max)
  const displayCount = count > max ? `${max}+` : count;

  return (
    <div className={cn('relative inline-flex', className)}>
      <button
        onClick={onClick}
        className='relative rounded-full p-1.5 flex group'
        aria-label={`${count} notifications `}
      >
        <Bell className={cn(`size-6`)} />

        {count > 0 &&
          (loading ? (
            <Skeleton className={cn('absolute -top-1 -right-1  h-5 w-5 px-1 bg-gray-300')} />
          ) : (
            <Badge
              className={cn(
                'absolute -top-1 -right-1 flex items-center justify-center h-5 min-w-5 px-1',
                'rounded-full text-xs font-medium group-hover:scale-105',
              )}
              variant={variant}
            >
              {displayCount}
            </Badge>
          ))}
      </button>
    </div>
  );
};

export default NotificationIcon;
