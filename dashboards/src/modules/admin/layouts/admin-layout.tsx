import { SidebarProvider } from '@/components/ui/sidebar';
import ParentNavbar from '../components/parent-navbar';
import ParentSidebar from '../components/parent-sidebar';
import { Outlet } from 'react-router';

const ParentLayout = () => {
  return (
    <SidebarProvider>
      <div className='w-full'>
        <ParentNavbar />
        <div className='flex min-h-screen pt-[4rem]'>
          <ParentSidebar />
          <main className='flex-1 overflow-y-auto'>{<Outlet />}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ParentLayout;
