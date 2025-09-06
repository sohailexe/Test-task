import { Card } from '@/components/ui/card';
import adminImage from '@/assets/images/admin.svg';

const OverviewWelcomeSection = () => {
  return (
    <Card className='px-7 hover:box-shadow-lg   relative'>
      <div className=''>
        <h1 className='text-2xl lg:text-4xl font-bold'>
          Welcome back, <span className='text-destructive'>Sohail!</span>
        </h1>
        <p className='lg:text-lg text-foreground max-w-sm leading-loose'>
          Your students complated <span className='font-bold text-destructive'>80%</span> of the
          tasks. Progress is <span className='font-bold text-destructive'>very good!</span>
        </p>
      </div>
      <img
        src={adminImage}
        alt='adminlogo'
        className='hidden lg:block max-h-[120px] absolute bottom-2 right-0'
      />
    </Card>
  );
};

export default OverviewWelcomeSection;
