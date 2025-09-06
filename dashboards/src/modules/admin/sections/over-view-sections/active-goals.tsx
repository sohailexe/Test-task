import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const goalsDetail = [
  {
    id: 1,
    title: 'Improve my math skills',
    description: 'Achieve a 90% score in the next math test',
    progress: 90,
    daysleft: 5,
  },
  {
    id: 2,
    title: 'Improve my math skills',
    description: 'Achieve a 90% score in the next math test',
    progress: 90,
    daysleft: 5,
  },
  {
    id: 3,
    title: 'Improve my math skills',
    description: 'Achieve a 90% score in the next math test',
    progress: 90,
    daysleft: 5,
  },
];

// function getbgColor(progress: number) {
//   if (progress >= 90) {
//     return 'bg-green-500';
//   }
//   if (progress >= 75) {
//     return 'bg-yellow-500';
//   }
//   if (progress >= 50) {
//     return 'bg-orange-500';
//   }
//   return 'bg-red-500';
// }
const ActiveGoals = () => {
  return (
    <div className=''>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-lg font-medium '>Active Goals</h1>
        <Button variant={'outline'}>
          <Plus /> New Goal
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        {goalsDetail.map(item => (
          <Card key={item.id} className='flex-row items-center justify-between gap-4 p-4'>
            <CardContent className='flex-1 p-0'>
              <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            <CardFooter className='p-0 justify-end flex'></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveGoals;
