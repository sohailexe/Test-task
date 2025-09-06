import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import MainSection from './main-section';
import Logo from '@/components/logo';

const ParentSidebar = () => {
  return (
    <Sidebar collapsible='icon' variant='floating' className=' '>
      <ParentSidebarHeader />
      <SidebarContent>
        <MainSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default ParentSidebar;

const ParentSidebarHeader = () => {
  return (
    <SidebarHeader className='flex items-center justify-center p-4'>
      <Logo />
    </SidebarHeader>
  );
};
