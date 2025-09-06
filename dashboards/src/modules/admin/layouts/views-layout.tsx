import QuickStatusSection from '../sections/over-view-sections/quick-status-section';
import { ReactNode } from 'react';
const ViewsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex  mx-auto container '>
      {children}
      <div className='hidden 2xl:block flex-1/4 p-4'>
        <QuickStatusSection />
      </div>
    </div>
  );
};

export default ViewsLayout;
