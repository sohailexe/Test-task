import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';

const childrenInfo = [
  {
    id: 1,
    name: 'M.Ali',
    grade: 5,
    image:
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800',
    progress: 90,
  },
  {
    id: 2,
    name: 'Nasir',
    grade: 7,
    image:
      'https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800',
    progress: 80,
  },
  {
    id: 3,
    name: 'Sohail Faiz',
    grade: 11,
    image:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800',
    progress: 85,
  },
];

function getbgColor(progress: number) {
  if (progress >= 90) {
    return 'bg-green-500';
  }
  if (progress >= 75) {
    return 'bg-yellow-500';
  }
  if (progress >= 50) {
    return 'bg-orange-500';
  }
  return 'bg-red-500';
}
const ChildrensSection = () => {
  return (
    <div className=''>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-lg font-medium '>Children</h1>
        <Button variant={'outline'}>
          <Plus /> Add Child
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        {childrenInfo.map(item => (
          <Card key={item.id} className='flex-row items-center justify-between gap-4 p-4'>
            <div className='w-12 h-12 rounded-sm relative overflow-hidden'>
              <img src={item.image} alt={item.name} className='object-cover h-full w-full' />
            </div>
            <CardContent className='flex-1 p-0'>
              <CardTitle className='text-sm font-medium'>{item.name}</CardTitle>
              <Badge variant='secondary'>{item.grade}th grade</Badge>
            </CardContent>
            <CardFooter className='p-0 justify-end flex'>
              <span>
                {' '}
                <span
                  className={`size-3 mx-1 inline-block rounded-full ` + getbgColor(item.progress)}
                />
                {item.progress}% progress
              </span>
              <Link to={`children/${item.id}`}>
                <Button variant='link' className='ml-4 group'>
                  <ArrowRight className='group-hover:translate-x-1 transition-transform  ' />{' '}
                  Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChildrensSection;
