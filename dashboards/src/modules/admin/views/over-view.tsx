import AppAreaChart from '@/components/AppAreaChart';
import AppBarChart from '@/components/AppBarChart';
import AppPieChart from '@/components/AppPieChart';
import CardList from '@/components/CardList';
import TodoList from '@/components/TodoList';
import OverviewWelcomeSection from '../sections/over-view-sections/overview-welcome-section';
import ChildrensSection from '../sections/over-view-sections/childrens-section';
import ActiveGoals from '../sections/over-view-sections/active-goals';

const Overview = () => {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 p-4'>
      <div className='col-span-1 lg:col-span-2 2xl:col-span-4'>
        <OverviewWelcomeSection />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
        <AppBarChart />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg 2xl:col-span-2'>
        <ChildrensSection />
      </div>

      <div className='bg-primary-foreground p-4 rounded-lg'>
        <TodoList />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
        <AppAreaChart />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <CardList title='Popular Content' />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <AppPieChart />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg 2xl:col-span-2'>
        <ActiveGoals />
      </div>
    </div>
  );
};

export default Overview;
