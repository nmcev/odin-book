import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const PostSkeleton: React.FC = () => {
  return (
    <div className='flex w-full px-5 py-5 max-w-lg'>
      <div className='flex-shrink-0'>
        <Skeleton circle={true} height={36} width={36} />
      </div>
      <div className='flex-1 space-y-2 ml-3'>
        <div className='flex gap-2 items-center justify-between'>
          <div className='flex flex-col'>
            <Skeleton width={120} height={20} />
            <Skeleton width={80} height={16} />
          </div>
        </div>
        <div className='cursor-pointer p-5'>
          <Skeleton count={3} />
        </div>
        <div className='flex gap-4 mt-2'>
          <div className='flex gap-1 items-center'>
            <Skeleton width={24} height={24} />
            <Skeleton width={50} height={16} />
          </div>
          <div className='flex gap-1 items-center'>
            <Skeleton width={24} height={24} />
            <Skeleton width={50} height={16} />
          </div>
          <div className='flex gap-1 items-center'>
            <Skeleton width={24} height={24} />
            <Skeleton width={50} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
