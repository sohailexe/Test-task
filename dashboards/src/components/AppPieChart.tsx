'use client';

import { Label, Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { TrendingUp } from 'lucide-react';

const chartConfig = {
  timeSpent: {
    label: 'Time Spent',
  },
  math: {
    label: 'Math',
    color: 'var(--chart-1)',
  },
  science: {
    label: 'Science',
    color: 'var(--chart-2)',
  },
  english: {
    label: 'English',
    color: 'var(--chart-3)',
  },
  history: {
    label: 'History',
    color: 'var(--chart-4)',
  },
  others: {
    label: 'Others',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const chartData = [
  { subject: 'math', timeSpent: 32, fill: 'var(--color-math)' },
  { subject: 'science', timeSpent: 28, fill: 'var(--color-science)' },
  { subject: 'english', timeSpent: 24, fill: 'var(--color-english)' },
  { subject: 'history', timeSpent: 18, fill: 'var(--color-history)' },
  { subject: 'others', timeSpent: 12, fill: 'var(--color-others)' },
];

const AppPieChart = () => {
  const totalHours = chartData.reduce((acc, curr) => acc + curr.timeSpent, 0);

  return (
    <div className=''>
      <h1 className='text-lg font-medium mb-6'>Time Spent by Subject</h1>
      <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey='timeSpent'
            nameKey='subject'
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-3xl font-bold'
                      >
                        {totalHours}h
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className='fill-muted-foreground'
                      >
                        Total Study
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className='mt-4 flex flex-col gap-2 items-center'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Up by 12% this month <TrendingUp className='h-4 w-4 text-green-500' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Study hours distribution in the last 30 days
        </div>
      </div>
    </div>
  );
};

export default AppPieChart;
