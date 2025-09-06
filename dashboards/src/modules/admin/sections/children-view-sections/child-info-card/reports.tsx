import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Download, Calendar, TrendingUp, AlertCircle, Award } from 'lucide-react';

const reports = [
  {
    id: 1,
    title: 'Monthly Progress Report',
    type: 'progress',
    period: 'February 2025',
    status: 'available',
    description: 'Comprehensive overview of academic performance across all subjects',
    generatedDate: '2025-03-01',
    size: '2.3 MB',
    icon: TrendingUp,
    highlights: ['Overall grade: A-', '3 subjects improved', 'Math needs attention'],
  },
  {
    id: 2,
    title: 'Attendance Report',
    type: 'attendance',
    period: 'January - February 2025',
    status: 'available',
    description: 'Detailed attendance tracking and punctuality analysis',
    generatedDate: '2025-02-28',
    size: '1.1 MB',
    icon: Calendar,
    highlights: ['98% attendance rate', '2 late arrivals', 'Perfect week streak: 3'],
  },
  {
    id: 3,
    title: 'Behavioral Assessment',
    type: 'behavior',
    period: 'Q2 2025',
    status: 'available',
    description: 'Social skills, classroom behavior, and peer interaction summary',
    generatedDate: '2025-02-25',
    size: '1.8 MB',
    icon: Award,
    highlights: ['Excellent teamwork', 'Leadership qualities', 'Helpful to peers'],
  },
  {
    id: 4,
    title: 'Subject-wise Analysis',
    type: 'academic',
    period: 'Semester 2',
    status: 'processing',
    description: 'In-depth analysis of performance in each subject with recommendations',
    generatedDate: null,
    size: null,
    icon: FileText,
    highlights: ['Expected completion: March 5', 'Will include improvement plans'],
  },
  {
    id: 5,
    title: 'Parent-Teacher Conference Notes',
    type: 'meeting',
    period: 'February 15, 2025',
    status: 'available',
    description: 'Summary of discussions and action items from recent meeting',
    generatedDate: '2025-02-16',
    size: '0.8 MB',
    icon: FileText,
    highlights: ['3 action items', 'Math tutor recommended', 'Next meeting: March 20'],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'draft':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'progress':
      return 'text-blue-600 bg-blue-50';
    case 'attendance':
      return 'text-green-600 bg-green-50';
    case 'behavior':
      return 'text-purple-600 bg-purple-50';
    case 'academic':
      return 'text-orange-600 bg-orange-50';
    case 'meeting':
      return 'text-indigo-600 bg-indigo-50';
    default:
      return ' bg-gray-50';
  }
};

const Reports = () => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-semibold '>Academic Reports</h3>
          <p className='text-sm  mt-1'>
            Download and view detailed reports about your child's progress
          </p>
        </div>
        <Button variant='outline' size='sm'>
          <Calendar className='h-4 w-4 mr-2' />
          Schedule Report
        </Button>
      </div>

      <div className='space-y-3'>
        {reports.map(report => {
          const IconComponent = report.icon;
          return (
            <Card key={report.id} className='p-5 hover:shadow-sm transition-all duration-200'>
              <div className='flex items-start justify-between'>
                <div className='flex items-start space-x-4 flex-1'>
                  <div className={`p-3 rounded-lg ${getTypeColor(report.type)}`}>
                    <IconComponent className='h-5 w-5' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center space-x-3 mb-2'>
                      <h4 className='text-base font-medium '>{report.title}</h4>
                      <Badge
                        variant='outline'
                        className={`text-xs px-2 py-1 ${getStatusColor(report.status)}`}
                      >
                        {report.status === 'available'
                          ? 'Ready'
                          : report.status === 'processing'
                            ? 'Processing'
                            : 'Draft'}
                      </Badge>
                    </div>
                    <p className='text-sm  mb-3'>{report.description}</p>
                    <div className='flex items-center space-x-4 text-xs  mb-3'>
                      <span>Period: {report.period}</span>
                      {report.generatedDate && (
                        <span>
                          Generated: {new Date(report.generatedDate).toLocaleDateString()}
                        </span>
                      )}
                      {report.size && <span>Size: {report.size}</span>}
                    </div>
                    bro
                    <div className='space-y-1'>
                      {report.highlights.map((highlight, index) => (
                        <div key={index} className='flex items-center space-x-2'>
                          <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                          <span className='text-xs '>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col space-y-2 ml-4'>
                  {report.status === 'available' ? (
                    <>
                      <Button size='sm' variant='default'>
                        <Download className='h-4 w-4 mr-2' />
                        Download
                      </Button>
                      <Button size='sm' variant='outline'>
                        <FileText className='h-4 w-4 mr-2' />
                        Preview
                      </Button>
                    </>
                  ) : (
                    <div className='flex items-center space-x-2 text-sm text-gray-200'>
                      <AlertCircle className='h-4 w-4' />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
        <div className='flex items-start space-x-3'>
          <FileText className='h-5 w-5 text-blue-600 mt-0.5' />
          <div>
            <h4 className='text-sm font-medium text-blue-900 mb-1'>Custom Report Request</h4>
            <p className='text-sm text-blue-700 mb-3'>
              Need a specific report or analysis? Contact your child's teacher to request customized
              reports.
            </p>
            <Button
              size='sm'
              variant='outline'
              className='border-blue-300 text-blue-700 hover:bg-blue-100'
            >
              Request Custom Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
