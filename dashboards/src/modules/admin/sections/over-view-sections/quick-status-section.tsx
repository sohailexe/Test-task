import { Card } from '@/components/ui/card';
import { Badge, Book, GoalIcon, PersonStandingIcon } from 'lucide-react';
const statusData = [
  {
    title: 'Children',
    value: 100,
    icon: PersonStandingIcon,
    color: 'bg-brand-secondry-1/60',
  },
  {
    title: 'Active Goals',
    value: 10,
    icon: GoalIcon,
    color: 'bg-brand-primary-1/60',
  },
  {
    title: 'Cources',
    value: 5,
    icon: Book,
    color: 'bg-brand-secondry-3/60',
  },
  {
    title: 'Achievements',
    value: 12,
    icon: Badge,
    color: 'bg-brand-primary-2/80',
  },
];
const QuickStatusSection = () => {
  return (
    <Card className='p-6 h-fit'>
      <h2 className='font-medium text-lg mb-4'>Quick Stats</h2>
      <div className='space-y-4'>
        {statusData.map((status, index) => {
          return (
            <div key={index} className='p-3 bg-muted rounded-lg flex gap-3 items-center'>
              <div className={`p-3 ${status.color} rounded-2xl`}>
                {<status.icon className='text-foreground w-6 h-6' />}
              </div>
              <div>
                <p className='text-sm font-medium'>{status.title}</p>
                <p className='text-2xl font-bold text-destructive'>{status.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickStatusSection;
