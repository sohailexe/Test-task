import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Calculator, Globe } from 'lucide-react';

interface Subject {
  name: string;
  progress: number;
  color: string;
  icon: React.ReactNode;
  totalLessons?: number;
  completedLessons?: number;
  grade?: string;
}

const sampleSubjects: Subject[] = [
  {
    name: 'Mathematics',
    progress: 85,
    color: 'bg-blue-500',
    icon: <Calculator className='w-4 h-4' />,
    totalLessons: 20,
    completedLessons: 17,
    grade: 'A',
  },
  {
    name: 'Computer Science',
    progress: 92,
    color: 'bg-emerald-500',
    icon: <Code className='w-4 h-4' />,
    totalLessons: 15,
    completedLessons: 14,
    grade: 'A+',
  },
  {
    name: 'Literature',
    progress: 73,
    color: 'bg-purple-500',
    icon: <BookOpen className='w-4 h-4' />,
    totalLessons: 18,
    completedLessons: 13,
    grade: 'B+',
  },
  {
    name: 'World History',
    progress: 68,
    color: 'bg-orange-500',
    icon: <Globe className='w-4 h-4' />,
    totalLessons: 22,
    completedLessons: 15,
    grade: 'B',
  },
];

const ProgressAndScore = () => {
  return (
    <div className=''>
      {/* Subject Progress Grid */}
      <div className='grid h-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        {sampleSubjects.map((subject, index) => (
          <SubjectProgress key={index} subject={subject} />
        ))}
      </div>
    </div>
  );
};

const SubjectProgress = ({ subject }: { subject: Subject }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-emerald-600';
    if (progress >= 80) return 'text-blue-600';
    if (progress >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getGradeColor = (grade: string) => {
    if (grade?.includes('A')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (grade?.includes('B')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (grade?.includes('C')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <Card className='group hover:shadow-xl hover:scale-101www transition-all duration-300 shadow-lg backdrop-blur-sm border'>
      <CardContent className='p-6'>
        <div className='space-y-4'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className={`w-10 h-10 rounded-xl ${subject.color} flex items-center justify-center shadow-sm`}
              >
                {subject.icon}
              </div>
              <div>
                <h3 className='font-semibold transition-colors'>{subject.name}</h3>
                <p className='text-sm'>
                  {subject.completedLessons}/{subject.totalLessons} lessons
                </p>
              </div>
            </div>
            {subject.grade && (
              <Badge variant='secondary' className={`${getGradeColor(subject.grade)} font-medium`}>
                {subject.grade}
              </Badge>
            )}
          </div>

          {/* Progress */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium '>Progress</span>
              <span className={`text-lg font-bold ${getProgressColor(subject.progress)}`}>
                {subject.progress}%
              </span>
            </div>
            <Progress value={subject.progress} className='h-2 ' />
          </div>

          {/* Stats */}
          <div className='flex items-center justify-between pt-2 border-t'>
            <div className='text-xs '>
              {subject.totalLessons! - subject.completedLessons!} remaining
            </div>
            <div className='text-xs '>
              {Math.round((subject.completedLessons! / subject.totalLessons!) * 100)}% complete
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressAndScore;
