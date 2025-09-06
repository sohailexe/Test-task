import ChildInfoCard from './child-info-card';

const ChildrenList = () => {
  return (
    <div className='flex flex-col gap-3'>
      {Array.from({ length: 2 }).map((_, index) => {
        return <ChildInfoCard key={index} />;
      })}
    </div>
  );
};

export default ChildrenList;
