import { Card } from '@/components/ui/card';

interface welcomeHeadingProps {
  heading?: string;
  description?: string;
}
const WelcomeHeadingSection = ({ heading, description }: welcomeHeadingProps) => {
  return (
    <Card className='px-7 hover:box-shadow-lg  relative'>
      <div>
        {/* <h1 className='text-2xl lg:text-4xl font-bold text-destructive'>Monitor Children</h1> */}
        <h1 className='text-2xl lg:text-4xl font-bold text-destructive'>{heading}</h1>

        {/* <p className='lg:text-lg text-foreground  leading-loose'>
          Track your children's academic progress and activities{' '}
        </p> */}

        <p className='lg:text-lg text-foreground  leading-loose'>{description}</p>
      </div>
    </Card>
  );
};

export default WelcomeHeadingSection;
