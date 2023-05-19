import React from 'react';

const LoadingTopBroker = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="min-h-[300px] flex flex-col items-center gap-2">
        {/* avatyar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
        {/* ten */}
        <div className="w-4/5 max-auto h-6 bg-gray-300 animate-pulse rounded-sm"></div>

        {/* phone and address */}
        <div className="w-1/2 mt-3 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
        <div className="w-1/2 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
      </div>

      <div className="hidden min-h-[300px] sm:flex flex-col items-center gap-2">
        {/* avatyar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
        {/* ten */}
        <div className="w-4/5 max-auto h-6 bg-gray-300 animate-pulse rounded-sm"></div>

        {/* phone and address */}
        <div className="w-1/2 mt-3 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
        <div className="w-1/2 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
      </div>

      <div className="hidden min-h-[300px] md:flex flex-col items-center gap-2">
        {/* avatyar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
        {/* ten */}
        <div className="w-4/5 max-auto h-6 bg-gray-300 animate-pulse rounded-sm"></div>

        {/* phone and address */}
        <div className="w-1/2 mt-3 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
        <div className="w-1/2 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
      </div>

      <div className="hidden min-h-[300px] lg:flex flex-col items-center gap-2">
        {/* avatyar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
        {/* ten */}
        <div className="w-4/5 max-auto h-6 bg-gray-300 animate-pulse rounded-sm"></div>

        {/* phone and address */}
        <div className="w-1/2 mt-3 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
        <div className="w-1/2 max-auto h-4 bg-gray-300 animate-pulse rounded-sm"></div>
      </div>
    </div>
  );
};

export default React.memo(LoadingTopBroker);
