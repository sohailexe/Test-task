import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
const ParentNavbar = () => {
  return (
    <nav className='px-3  '>
      <div className='fixed top-0 left-0 right-0 flex items-center  px-2 py-3 pr-5  shadow-sm bg-background  z-50 '>
        <div className='flex justify-between items-center gap-4 w-full '>
          {/* {Trigger navbar} */}
          <div className='flex  items-center '>
            <Link to='/parent'>
              <div className='flex items-center gap-1'>
                <p className=' text-xl font-semibold tracking-tighter pl-5'>Brain Bee</p>
              </div>
            </Link>
          </div>

          <div className=' flex items-center gap-4 '>
            <ModeToggle />
            <Button variant={'outline'}>Login</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ParentNavbar;
