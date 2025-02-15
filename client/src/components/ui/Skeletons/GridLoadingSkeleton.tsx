const GridLoadingSkeleton = () => {
  // Create a grid of 12 skeleton cards to fill typical viewport
  const skeletonCards = Array(12).fill(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {skeletonCards.map((_, index) => (
        <div key={index} className="w-full">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image skeleton */}
            <div className="w-full aspect-square bg-gray-200 animate-pulse" />
            
            {/* Content container */}
            <div className="p-4">
              {/* Name skeleton */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
              
              {/* Bio skeleton - two lines */}
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

export default GridLoadingSkeleton;