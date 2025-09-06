import { ModeToggle } from '@/components/mode-toggle';
import NotificationIcon from '@/components/notification-icon';
import SearchInput from '@/components/search-input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserProfile from '@/modules/auth/components/user-profile';
import { Link } from 'react-router';

// import useAuthStore from '@/store/authStore';
const ParentNavbar = () => {
  // const { user } = useAuthStore();
  return (
    <nav className="px-3  ">
      <div className="fixed top-0 left-0 right-0 flex items-center  px-2 py-3 pr-5  shadow-sm bg-background  z-50 ">
        <div className="flex justify-between items-center gap-4 w-full ">
          {/* {Trigger navbar} */}
          <div className="flex  items-center ">
            <SidebarTrigger size={"lg"} />
            <Link to="/admin">
              <div className="flex items-center gap-1">
                <p className="hidden md:block text-xl font-semibold tracking-tighter pl-5">
                  Duseca Softwares Task
                </p>
              </div>
            </Link>
          </div>

          <div className=" flex items-center gap-4 ">
            {/* <ModeToggle /> */}
            {/* <NotificationIcon count={2} max={3} variant={'destructive'} className='mt-2' /> */}
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ParentNavbar;
