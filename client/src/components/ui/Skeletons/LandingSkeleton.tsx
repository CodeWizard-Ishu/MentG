const LandingSkeleton = () => {
  // Create an array of 6 items to match typical mentor display count
  const skeletonCards = Array(10).fill(null);

  return (
    <div className="flex space-x-4">
      {skeletonCards.map((_, index) => (
        <div key={index} className="w-40 sm:w-48 md:w-44">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image skeleton */}
            <div className="w-full h-40 bg-gray-200 animate-pulse" />
            
            {/* Name skeleton */}
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingSkeleton;