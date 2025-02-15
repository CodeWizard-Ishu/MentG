// Calendar Skeleton
export const CalendarSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Calendar Integration */}
      <div className="bg-gray-200 h-16 rounded-lg mb-6"></div>
      
      {/* Card for availability */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md mt-24">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          </div>
          
          {/* Days of week */}
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-2">
              <div className="flex items-center space-x-2 min-w-[120px]">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-16 h-5 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <div className="w-24 h-10 bg-gray-300 rounded"></div>
                <div className="text-gray-300">-</div>
                <div className="w-24 h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t">
          <div className="w-40 h-10 bg-gray-300 rounded-md"></div>
          <div className="w-24 h-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

// Home Skeleton
export const HomeSkeleton = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex items-center">
            <div className="mr-4 w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="min-w-0">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Meetings */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto mb-8">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[...Array(4)].map((_, index) => (
                    <th key={index} className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[...Array(3)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {[...Array(4)].map((_, colIndex) => (
                      <td key={colIndex} className="p-3">
                        {colIndex === 3 ? (
                          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                        ) : (
                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="h-6 bg-gray-300 rounded w-36 mb-4"></div>
        {/* Empty notifications area */}
      </div>
    </div>
  );
};

// Meetings Skeleton
export const MeetingsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Recent Meetings */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[...Array(6)].map((_, index) => (
                    <th key={index} className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {[...Array(6)].map((_, colIndex) => (
                      <td key={colIndex} className="p-3">
                        {colIndex === 3 ? (
                          <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                        ) : colIndex === 5 ? (
                          <div className="h-8 bg-gray-300 rounded w-8"></div>
                        ) : (
                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="w-24 h-10 bg-gray-300 rounded"></div>
        <div className="w-32 h-5 bg-gray-300 rounded"></div>
        <div className="w-24 h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

// Services Skeleton
export const ServicesSkeleton = () => {
    return (
      <div className="px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-6xl mx-auto">
          {/* Domains section */}
          <div className="mb-9">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="h-8 bg-gray-300 rounded w-48"></div>
              <div className="h-5 bg-gray-300 rounded w-36 mt-2 sm:mt-0"></div>
            </div>
  
            <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="h-12 bg-gray-300 rounded-xl transition-all duration-200"
                ></div>
              ))}
            </div>
          </div>
  
          {/* Services section */}
          <div className="mb-9">
            <div className="h-6 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-12 bg-gray-300 rounded-xl transition-all duration-200"
                ></div>
              ))}
            </div>
          </div>
  
          {/* Save button */}
          <div className="flex justify-center sm:justify-start mt-10">
            <div className="w-48 h-12 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    );
};

// Profile Details Skeleton
export const ProfileDetailsSkeleton = () => {
  return (
    <div className="min-h-screen p-4 animate-pulse">
      <div className="w-full md:w-2/4">
        <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>

        {/* Profile Picture */}
        <div className="flex items-center justify-between space-x-6 mb-6">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded w-32"></div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[...Array(2)].map((_, index) => (
            <div key={index}>
              <div className="h-5 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="mb-4">
          <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded w-full"></div>
        </div>

        {/* Social Accounts */}
        <div className="mb-4">
          <div className="h-5 bg-gray-300 rounded w-36 mb-2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded m-1"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded m-1"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="h-5 bg-gray-300 rounded w-16 mb-2"></div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded m-1"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-start mt-14">
          <div className="w-40 h-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

// Export all skeletons
const Skeletons = {
  Calendar: CalendarSkeleton,
  Home: HomeSkeleton,
  Meetings: MeetingsSkeleton,
  Services: ServicesSkeleton,
  ProfileDetails: ProfileDetailsSkeleton
};

export default Skeletons;