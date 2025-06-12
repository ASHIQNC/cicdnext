import React from 'react';

const ProductSkeleton = () => {
  //animate-pulse: this will give us loading kind of animation
  return (
    <div className="relatice animate-pulse">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 ">
        {/* image skelton section */}
        <div className="h-full w-full bg-gray-200" />
      </div>

      {/* details section */}

      <div className="mt-4 flex flex-col gap-2">
        <div className="bg-gray-200 h-4 w-full" />
        <div className="bg-gray-200 h-4 w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
