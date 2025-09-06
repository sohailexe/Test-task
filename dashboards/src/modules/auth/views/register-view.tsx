import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, User } from 'lucide-react';
import RegistrationForm from '../components/registration-form';

export default function RegistrationView() {
  return (
    <div className='w-full space-y-2'>
      <div className='flex justify-center'>
        <h1 className='text-xl lg:text-2xl'>BrainBee</h1>
      </div>

      <Tabs defaultValue='parent' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='parent' className=''>
            <User className='mr-2 h-4 w-4' />
            Parent
          </TabsTrigger>
          <TabsTrigger value='teacher'>
            <BookOpen className='mr-2 h-4 w-4' />
            Teacher
          </TabsTrigger>
        </TabsList>
        <div className='mt-4'>
          <TabsContent value='parent'>
            <RegistrationForm userType='parent' />
          </TabsContent>
          <TabsContent value='teacher'>
            <RegistrationForm userType='teacher' />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
