import { Trash2, Upload } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import UserAvatar from './user-avatar';
import { useEffect, useRef, useState } from 'react';
import { useAuthActions, useAuth } from '@/store/authStore';

const ProfileImageUpload = () => {
  // upload to bakend
  const { error, isLoading, user } = useAuth();
  const { updateProfilePic } = useAuthActions();
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  // profile image take input refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.profileImage || '');

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setFileToUpload(file);
    }
  };

  const handleUpload = async () => {
    if (!fileToUpload) return alert('No file selected');
    // prepare file to uplad to backend
    const formData = new FormData();
    formData.append('profileImage', fileToUpload); // 'avatar' is the backend field name
    await updateProfilePic(formData);
  };
  return (
    <div className='flex flex-col items-center text-center space-y-4'>
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/png, image/jpeg, image/gif'
        onChange={handleFileChange}
      />

      <UserAvatar
        ref={avatarRef}
        className='hover:scale-101 transition-transform cursor-pointer ring-2 ring-offset-2 ring-blue-500'
        imgUrl={previewUrl}
        name={user?.firstName || '?'}
        size={'xxl'}
        showDetails={false}
        onClick={() => fileInputRef.current?.click()}
      />

      {error && <p>{error.message}</p>}

      <div className='space-y-2'>
        <h3 className='text-xl font-semibold '>John Doe</h3>
        <p className='text-sm '>john.doe@example.com</p>
        <Badge variant='secondary' className='text-xs'>
          Premium Member
        </Badge>
      </div>

      <Separator className='w-full' />

      <div className='flex flex-col w-full space-y-3'>
        <Button
          onClick={handleUpload}
          className='w-full bg-blue-600 hover:bg-blue-700 transition-colors'
          size='sm'
          disabled={isLoading || !fileToUpload}
        >
          <Upload className='h-4 w-4 mr-2' />
          {isLoading ? 'Uplading...' : 'Upload pic'}
        </Button>
        <Button
          variant='outline'
          className='w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors'
          size='sm'
        >
          <Trash2 className='h-4 w-4 mr-2' />
          Remove Photo
        </Button>
      </div>

      {/* Profile Stats */}
      <div className='w-full pt-4'>
        <div className='grid grid-cols-2 gap-4 text-center'>
          <div className='space-y-1'>
            <p className='text-2xl font-bold '>24</p>
            <p className='text-xs  uppercase tracking-wide'>Projects</p>
          </div>
          <div className='space-y-1'>
            <p className='text-2xl font-bold '>156</p>
            <p className='text-xs  uppercase tracking-wide'>Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
