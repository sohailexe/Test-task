import { Card, CardContent } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import ProfileForm from './profile-form';
import ProfileImageUpload from '@/components/ProfileImageUpload';
const ProfileTab = () => {
  return (
    <div className='max-w-7xl mx-auto '>
      {/* Header Section */}
      <Card className='flex flex-row px-4 mb-4'>
        <div className='p-2 size-15 flex justify-center items-center bg-brand-primary-1 rounded-lg'>
          <User className='h-5 w-5 text-primary' />
        </div>
        <div>
          <h1 className='text-2xl font-bold '>Profile Settings</h1>
          <p className=''>Manage your account information and preferences</p>
        </div>
      </Card>

      {/* Main Content */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        {/* Profile Overview Card */}
        <Card className='xl:col-span-1  shadow-md'>
          <CardContent className='p-6'>
            <ProfileImageUpload />
          </CardContent>
        </Card>

        {/* Profile Form Card */}
        <Card className='xl:col-span-2  shadow-md'>
          <CardContent className='p-0'>
            <div className='p-6 border-b'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-lg font-semibold '>Personal Information</h2>
                  <p className='text-sm  mt-1'>
                    Update your personal details and contact information
                  </p>
                </div>
                <Badge variant='outline' className='text-xs'>
                  Last updated 2 days ago
                </Badge>
              </div>
            </div>

            <div className='p-6'>
              <ProfileForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
