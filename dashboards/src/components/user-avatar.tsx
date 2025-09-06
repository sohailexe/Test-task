import { forwardRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const getBackgroundColorForName = (name: string): string => {
  if (!name || name.length === 0) {
    return 'bg-gray-500';
  }
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
  ];

  const charCode = name.toUpperCase().charCodeAt(0);
  const colorIndex = (charCode - 65) % colors.length;
  return colors[colorIndex] || 'bg-gray-500';
};

const avatarVarience = cva('', {
  variants: {
    size: {
      default: 'h-9 w-9',
      xs: 'h-4 w-4',
      sm: 'h-6 w-6',
      lg: 'h-10 w-10',
      xl: 'h-[160px] w-[160px]',
      xxl: 'size-44',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVarience> {
  imgUrl: string;
  name: string;
  role?: string;
  className?: string;
  fallbackClassName?: string;
  fallbackTextClassName?: string;
  showDetails?: boolean;
  onClick?: () => void;
}

// 👇 Add forwardRef here
const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  (
    {
      showDetails = true,
      fallbackClassName = '',
      fallbackTextClassName = 'text-5xl',
      imgUrl,
      name,
      className,
      onClick,
      size,
      role,
    },
    ref,
  ) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const backgroundColorClass = getBackgroundColorForName(name);

    return (
      <>
        <style>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .shimmer-hover {
            position: relative;
            overflow: hidden;
          }

          .shimmer-hover::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: translateX(-100%);
            transition: transform 0s;
          }

          .shimmer-hover:hover::after {
            transform: translateX(100%);
            transition: transform 0.6s ease-in-out;
          }
        `}</style>

        <div className='flex items-center gap-2' ref={ref}>
          <Avatar
            className={cn(avatarVarience({ size }), 'shimmer-hover cursor-pointer', className)}
            onClick={onClick}
          >
            <AvatarImage src={imgUrl} alt={name} />
            <AvatarFallback
              className={cn(
                backgroundColorClass,
                'text-white font-semibold flex items-center justify-center',
                fallbackClassName,
              )}
            >
              <span className={fallbackTextClassName}>{initial}</span>
            </AvatarFallback>
          </Avatar>
          {showDetails && (
            <div className='flex flex-col'>
              <p>{name}</p>
              <p className='text-sm text-muted-foreground'>{role}</p>
            </div>
          )}
        </div>
      </>
    );
  },
);

UserAvatar.displayName = 'UserAvatar'; // Important for debugging

export default UserAvatar;
