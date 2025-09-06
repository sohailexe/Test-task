import ChildrenTab from '../sections/settings-view-sections/children-tab';
import NotificationsTab from '../sections/settings-view-sections/notifications-tab';
import ProfileTab from '../sections/settings-view-sections/profile-tab';
import PasswordAndSecurityTab from '../sections/settings-view-sections/security-tab';
import WelcomeHeadingSection from '../sections/welcome--heading-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingView = () => {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 p-4'>
      <div className='col-span-1 lg:col-span-2 2xl:col-span-4'>
        <WelcomeHeadingSection
          heading='Settings'
          description='Manage your account settings and preferences'
        />
      </div>
      <div className='col-span-1 lg:col-span-2 2xl:col-span-4'>
        <Tabs defaultValue='profile' className='w-full'>
          <TabsList className='grid w-full grid-cols-4 mb-4'>
            <TabsTrigger value='profile' className='text-xs sm:text-sm'>
              Profile
            </TabsTrigger>
            <TabsTrigger value='passwordAndSecurity' className='text-xs sm:text-sm'>
              Security
            </TabsTrigger>
            <TabsTrigger value='children' className='text-xs sm:text-sm'>
              Children
            </TabsTrigger>
            <TabsTrigger value='notification' className='text-xs sm:text-sm'>
              Notification
            </TabsTrigger>
          </TabsList>

          <TabsContent value='profile' className='mt-0'>
            <ProfileTab />
          </TabsContent>
          <TabsContent value='passwordAndSecurity' className='mt-0'>
            <PasswordAndSecurityTab />
          </TabsContent>
          <TabsContent value='children' className='mt-0'>
            <ChildrenTab />
          </TabsContent>
          <TabsContent value='notification' className='mt-0'>
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingView;
