import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleSlashIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4'>
      <Card className='mx-auto max-w-md shadow-lg'>
        <CardHeader className='text-center pb-2'>
          <div className='flex justify-center mb-6'>
            <div className='rounded-full bg-muted p-6'>
              <CircleSlashIcon className='h-12 w-12 text-muted-foreground' />
            </div>
          </div>
          <CardTitle className='text-3xl font-bold'>Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className='text-center space-y-4 pt-4'>
          <p className='text-muted-foreground'>
            We couldn't find the page you're looking for. The page might have been moved, deleted,
            or never existed.
          </p>
          <div className='h-px w-full bg-border my-2' />
          <p className='text-sm text-muted-foreground'>Error code: 404</p>
        </CardContent>
        <CardFooter className='flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 pt-2'>
          <Button variant='outline' className='w-full sm:w-1/2' onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button className='w-full sm:w-1/2' onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
