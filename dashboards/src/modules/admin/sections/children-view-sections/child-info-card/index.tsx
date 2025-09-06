import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserAvatar from '@/components/user-avatar';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';
import ProgressAndScore from './progress-score';
import RecentActivities from './recent-activities';
import Reports from './reports';

import { useState } from 'react';

const ChildInfoCard = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Card className='p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center justify-between mb-4'>
        <UserAvatar
          imgUrl='https://github.com/shadcn.png'
          name='Sohail Faiz'
          role='7th grade'
          size={'lg'}
        />

        <Badge variant={'secondary'} className='py-1.5 px-3 text-sm font-medium'>
          Overall Progress:
          <span className='ml-1 font-semibold text-green-600'>86%</span>
        </Badge>

        <Button variant={'outline'} size={'sm'} className='flex items-center gap-2'>
          <Eye className='h-4 w-4' />
          Full Profile
        </Button>
      </div>

      <Button
        onClick={() => setExpanded(prev => !prev)}
        variant={'ghost'}
        size={'sm'}
        className='w-fit flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
      >
        {expanded ? (
          <>
            <ChevronUp className='h-4 w-4' />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className='h-4 w-4' />
            Show More
          </>
        )}
      </Button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Tabs defaultValue='progress' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-4'>
            <TabsTrigger value='progress' className='text-xs sm:text-sm'>
              Progress & Scores
            </TabsTrigger>
            <TabsTrigger value='activities' className='text-xs sm:text-sm'>
              Recent Activities
            </TabsTrigger>
            <TabsTrigger value='reports' className='text-xs sm:text-sm'>
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value='progress' className='mt-0'>
            <ProgressAndScore />
          </TabsContent>
          <TabsContent value='activities' className='mt-0'>
            <RecentActivities />
          </TabsContent>
          <TabsContent value='reports' className='mt-0'>
            <Reports />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default ChildInfoCard;
