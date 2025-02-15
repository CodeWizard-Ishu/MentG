// Meetings Skeleton
export const MeetingsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        {/* Header Skeleton */}
        <div className="h-6 bg-gray-200 rounded-md w-48 mb-4" />
        
        {/* Table Skeleton */}
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 w-1/6"><div className="h-4 bg-gray-200 rounded w-full" /></th>
                  <th className="p-3 w-1/6"><div className="h-4 bg-gray-200 rounded w-full" /></th>
                  <th className="p-3 w-1/6"><div className="h-4 bg-gray-200 rounded w-full" /></th>
                  <th className="p-3 w-1/6"><div className="h-4 bg-gray-200 rounded w-full" /></th>
                  <th className="p-3 w-1/6"><div className="h-4 bg-gray-200 rounded w-full" /></th>
                  <th className="p-3 w-1/6"></th>
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(0).map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3"><div className="h-4 bg-gray-200 rounded w-full" /></td>
                    <td className="p-3"><div className="h-4 bg-gray-200 rounded w-full" /></td>
                    <td className="p-3"><div className="h-4 bg-gray-200 rounded w-full" /></td>
                    <td className="p-3"><div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" /></td>
                    <td className="p-3"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
                    <td className="p-3"><div className="h-8 bg-gray-200 rounded w-8" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Pagination Controls Skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-10 bg-gray-200 rounded-md w-24" />
        <div className="h-6 bg-gray-200 rounded-md w-32" />
        <div className="h-10 bg-gray-200 rounded-md w-24" />
      </div>
    </div>
  );
};

// Profile Page Skeleton
export const ProfileSettingsSkeleton = () => {
  return (
    <div className="min-h-screen p-4 animate-pulse">
      <div>
        <div className="w-full md:w-2/4">
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded-md w-48 mb-4" />
          
          {/* Profile Picture Skeleton */}
          <div className="flex items-center justify-between space-x-6 mb-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 rounded-full bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-6 bg-gray-200 rounded-md w-32" />
          </div>
          
          {/* Name Fields Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="h-6 bg-gray-200 rounded-md w-24 mb-2" />
              <div className="h-10 bg-gray-200 rounded-md w-full" />
            </div>
            <div>
              <div className="h-6 bg-gray-200 rounded-md w-24 mb-2" />
              <div className="h-10 bg-gray-200 rounded-md w-full" />
            </div>
          </div>
          
          {/* About Yourself Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded-md w-32 mb-2" />
            <div className="h-36 bg-gray-200 rounded-md w-full" />
          </div>
          
          {/* Social Accounts Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded-md w-36 mb-2" />
            <div className="space-y-2">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded m-1" />
                  <div className="h-10 bg-gray-200 rounded-md w-full" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Phone Number Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded-md w-32 mb-2" />
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded m-1" />
              <div className="h-10 bg-gray-200 rounded-md w-full" />
            </div>
          </div>
          
          {/* Email Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded-md w-16 mb-2" />
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded m-1" />
              <div className="h-10 bg-gray-200 rounded-md w-full" />
            </div>
          </div>
          
          {/* Save Button Skeleton */}
          <div className="flex justify-start mt-14">
            <div className="h-10 bg-gray-200 rounded-md w-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Skeletons = {
    Meetings: MeetingsSkeleton,
    ProfileSettings: ProfileSettingsSkeleton
}

export default Skeletons;