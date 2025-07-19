import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      {/* Main loading animation */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-700">Cooking up delicious recipes...</h3>
        <p className="text-gray-500">Please wait while we gather the best recipes for you</p>
      </div>
      
      {/* Recipe card skeleton */}
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-sm:grid-cols-1 sm:grid-cols-2 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200"></div>
            
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              
              {/* Tags skeleton */}
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
              </div>
              
              {/* Button skeleton */}
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner; 