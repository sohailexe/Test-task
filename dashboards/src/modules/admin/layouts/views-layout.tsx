import { ReactNode } from "react";
const ViewsLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex  mx-auto container ">{children}</div>;
};

export default ViewsLayout;
