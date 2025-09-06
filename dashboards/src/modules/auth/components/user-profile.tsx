import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import UserAvatar from '@/components/user-avatar';
import { Dock, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/store/authStore';
import { useAuthActions } from '@/store/authStore';

const profileOptions = [
  {
    label: 'Profile',
    icon: User,
    onClick: () => {
      console.log('Profile clicked');
    },
  },
  {
    label: 'Settings',
    icon: Settings,
    onClick: () => {
      console.log('Settings clicked');
    },
  },
  {
    label: 'Billing',
    icon: Dock,
  },
];
const UserProfile = () => {
  const { logout } = useAuthActions();
  const { isLoading, user } = useAuth();
  return (
    <Popover modal={false}>
      <PopoverTrigger>
        <UserAvatar
          imgUrl={user?.profileImage || ''}
          name={user?.firstName || ''}
          role={user?.role}
          size={'lg'}
          fallbackTextClassName='text-xl'
        />
      </PopoverTrigger>
      <PopoverContent className='gap-4 flex flex-col'>
        <UserAvatar
          imgUrl={user?.profileImage || ''}
          name={user?.firstName || ''}
          role={user?.role}
          size={'lg'}
          fallbackTextClassName='text-xl'
        />

        <hr />
        <div>
          {profileOptions.map(option => (
            <div
              key={option.label}
              className='flex items-center gap-2 p-2 cursor-pointer hover:bg-accent'
              onClick={option.onClick}
            >
              <option.icon className='h-4 w-4' />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
        <hr />
        <Button
          className='w-full'
          onClick={() => {
            logout();
            // navigate('/login');
          }}
        >
          <LogOut />
          {isLoading ? 'Logging out...' : 'Logout'}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
