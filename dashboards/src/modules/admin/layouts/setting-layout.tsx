import { ReactNode } from 'react';
const SettingLayout = ({ children }: { children: ReactNode }) => {
  return <div className=' mx-auto container '>{children}</div>;
};

export default SettingLayout;
