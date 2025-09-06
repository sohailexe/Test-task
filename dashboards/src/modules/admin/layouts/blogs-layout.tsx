import { ReactNode } from 'react';
const BlogsLayout = ({ children }: { children: ReactNode }) => {
  return <div className=' mx-auto container '>{children}</div>;
};

export default BlogsLayout;
