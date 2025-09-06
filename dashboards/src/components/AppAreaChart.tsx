'use client';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  math: {
    label: 'Math',
    color: 'var(--chart-1)',
  },
  science: {
    label: 'Science',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'January', math: 85, science: 78 },
  { month: 'February', math: 90, science: 82 },
  { month: 'March', math: 88, science: 80 },
  { month: 'April', math: 92, science: 85 },
  { month: 'May', math: 87, science: 89 },
  { month: 'June', math: 91, science: 88 },
];

const ParentAssessmentScoreChart = () => {
  return (
    <div>
      <h1 className='text-lg font-medium mb-6'>Monthly Assessment Scores</h1>
      <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
        <AreaChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} domain={[0, 100]} unit='%' />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
            <linearGradient id='fillMath' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='var(--color-math)' stopOpacity={0.8} />
              <stop offset='95%' stopColor='var(--color-math)' stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id='fillScience' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='var(--color-science)' stopOpacity={0.8} />
              <stop offset='95%' stopColor='var(--color-science)' stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey='math'
            type='natural'
            fill='url(#fillMath)'
            fillOpacity={0.4}
            stroke='var(--color-math)'
            stackId='a'
          />
          <Area
            dataKey='science'
            type='natural'
            fill='url(#fillScience)'
            fillOpacity={0.4}
            stroke='var(--color-science)'
            stackId='a'
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default ParentAssessmentScoreChart;
