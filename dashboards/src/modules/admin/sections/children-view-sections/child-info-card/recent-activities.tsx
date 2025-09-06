import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { BookOpen, Trophy, Clock, CheckCircle2 } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'assignment',
    title: 'Math Assignment: Algebra Basics',
    subject: 'Mathematics',
    score: 92,
    timestamp: '2 hours ago',
    status: 'completed',
    icon: BookOpen,
  },
  {
    id: 2,
    type: 'quiz',
    title: 'Science Quiz: Solar System',
    subject: 'Science',
    score: 88,
    timestamp: '1 day ago',
    status: 'completed',
    icon: Trophy,
  },
  {
    id: 3,
    type: 'reading',
    title: 'Reading: The Great Gatsby Ch.5',
    subject: 'English',
    score: null,
    timestamp: '2 days ago',
    status: 'in_progress',
    icon: BookOpen,
  },
  {
    id: 4,
    type: 'test',
    title: 'History Test: World War II',
    subject: 'Social Studies',
    score: 95,
    timestamp: '3 days ago',
    status: 'completed',
    icon: CheckCircle2,
  },
  {
    id: 5,
    type: 'assignment',
    title: 'English Essay: Character Analysis',
    subject: 'English',
    score: 87,
    timestamp: '4 days ago',
    status: 'completed',
    icon: BookOpen,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

const RecentActivities = () => {
  return (
    <div className='grid lg:grid-cols-2  gap-5 '>
      {activities.map(activity => {
        const IconComponent = activity.icon;
        return (
          <Card key={activity.id} className='p-4 hover:shadow-sm transition-shadow'>
            <div className='flex items-start justify-between'>
              <div className='flex items-start space-x-3 flex-1'>
                <div className='p-2 rounded-full bg-blue-50'>
                  <IconComponent className='h-4 w-4 text-blue-600' />
                </div>

                <div className='flex-1 min-w-0'>
                  <h4 className='text-sm font-medium truncate'>{activity.title}</h4>
                  <p className='text-xs text-gray-500 mt-1'>{activity.subject}</p>
                  <div className='flex items-center space-x-2 mt-2'>
                    <Clock className='h-3 w-3 text-gray-400' />
                    <span className='text-xs text-gray-500'>{activity.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-end space-y-2'>
                <Badge
                  variant='secondary'
                  className={`text-xs px-2 py-1 ${getStatusColor(activity.status)}`}
                >
                  {activity.status === 'completed' ? 'Completed' : 'In Progress'}
                </Badge>

                {activity.score && (
                  <div className={`text-sm font-semibold ${getScoreColor(activity.score)}`}>
                    {activity.score}%
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}

      <div className='text-center pt-4'>
        <button className='text-sm text-blue-600 hover:text-blue-800 font-medium'>
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;
