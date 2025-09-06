'use client';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  math: {
    label: 'Mathematics',
    color: 'hsl(var(--chart-1))',
  },
  science: {
    label: 'Science',
    color: 'hsl(var(--chart-2))',
  },
  english: {
    label: 'English',
    color: 'hsl(var(--chart-3))',
  },
  social: {
    label: 'Social Studies',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'September', math: 85, science: 78, english: 92, social: 88 },
  { month: 'October', math: 88, science: 82, english: 89, social: 91 },
  { month: 'November', math: 92, science: 85, english: 94, social: 87 },
  { month: 'December', math: 89, science: 88, english: 96, social: 92 },
  { month: 'January', math: 94, science: 91, english: 93, social: 89 },
  { month: 'February', math: 91, science: 87, english: 97, social: 94 },
];

const ParentDashboardChart = () => {
  return (
    <div className=' rounded-lg p-6 shadow-sm border'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold  mb-2'>Academic Performance Overview</h2>
        <p className='text-sm '>Monthly subject-wise performance scores for your child</p>
      </div>

      <ChartContainer config={chartConfig} className='min-h-[300px] w-full'>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' vertical={false} className='opacity-30' />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
            className='text-sm'
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={value => `${value}%`}
            className='text-sm'
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [
                  `${value}%`,
                  chartConfig[name as keyof typeof chartConfig]?.label,
                ]}
                labelFormatter={label => `Month: ${label}`}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='math' fill='var(--chart-4)' radius={[2, 2, 0, 0]} />
          <Bar dataKey='science' fill='var(--chart-1)' radius={[2, 2, 0, 0]} />
          <Bar dataKey='english' fill='var(--chart-2)' radius={[2, 2, 0, 0]} />
          <Bar dataKey='social' fill='var(--chart-3)' radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartContainer>

      <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='text-center p-3  rounded-lg'>
          <div className='text-2xl font-bold text-blue-600'>91%</div>
          <div className='text-sm '>Math Average</div>
        </div>
        <div className='text-center p-3  rounded-lg'>
          <div className='text-2xl font-bold text-green-600'>85%</div>
          <div className='text-sm '>Science Average</div>
        </div>
        <div className='text-center p-3  rounded-lg'>
          <div className='text-2xl font-bold text-purple-600'>94%</div>
          <div className='text-sm '>English Average</div>
        </div>
        <div className='text-center p-3  rounded-lg'>
          <div className='text-2xl font-bold text-orange-600'>90%</div>
          <div className='text-sm '>Social Average</div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboardChart;
