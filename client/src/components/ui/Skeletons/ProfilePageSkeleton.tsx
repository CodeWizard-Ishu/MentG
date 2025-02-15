import React from "react";
import Logo from "../../../assets/logo.png";

const ProfilePageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-sky-200">
      <header className="sticky top-0 z-50 bg-[#08286b] flex justify-between items-center p-3 md:p-4 lg:p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-24 md:h-10 md:w-28 lg:h-12 lg:w-36"
            />
          </a>
        </div>
      </header>

      <div className="min-h-full flex justify-center items-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-3 overflow-hidden">
          {/* Sidebar Profile Section Skeleton */}
          <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4 md:p-8 relative">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                {/* Profile picture skeleton */}
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white/30 mb-4 md:mb-6 shadow-lg bg-white/30 animate-pulse"></div>
                
                {/* Name skeleton */}
                <div className="h-6 md:h-8 w-32 md:w-48 bg-white/30 rounded animate-pulse mb-2"></div>
              </div>

              {/* Stats grid skeleton */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full text-center mb-4 md:mb-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white/20 rounded-lg p-2 md:p-3"
                  >
                    <div className="flex justify-center items-center space-x-1 mb-1">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-white/40 rounded animate-pulse"></div>
                      <div className="h-4 md:h-5 w-4 md:w-6 bg-white/40 rounded animate-pulse"></div>
                    </div>
                    <div className="h-2 md:h-3 w-12 md:w-16 bg-purple-200/40 rounded animate-pulse mx-auto"></div>
                  </div>
                ))}
              </div>
              
              {/* Connect section skeleton */}
              <div className="flex mb-4 space-x-2">
                <div className="h-4 w-24 bg-white/30 rounded animate-pulse mt-1"></div>
                <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Domain section skeleton */}
            <div className="border-t pt-4 pb-4">
              <div className="flex flex-col space-y-2">
                <div className="h-5 md:h-6 w-16 md:w-20 bg-white/30 rounded animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-5 w-16 md:w-20 bg-indigo-50/30 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services section skeleton */}
            <div className="border-t pt-4">
              <div className="h-5 md:h-6 w-16 md:w-20 bg-white/30 rounded animate-pulse mb-3"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-5 w-20 md:w-24 bg-indigo-50/30 rounded-full animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area Skeleton */}
          <div className="col-span-1 md:col-span-2 bg-white">
            {/* Tabs skeleton */}
            <div className="border-b">
              <div className="flex">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 py-3 md:py-4 flex justify-center"
                  >
                    <div className="h-4 md:h-5 w-16 md:w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Content skeleton - Services tab as default */}
            <div className="p-4 md:p-8">
              <div className="h-6 md:h-7 w-40 md:w-48 bg-gray-200 rounded animate-pulse mb-4 md:mb-6"></div>

              {/* Service items skeleton */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-4 md:mb-8">
                  <div className="w-full h-16 md:h-20 bg-sky-100 rounded-xl animate-pulse"></div>
                </div>
              ))}

              {/* Book button skeleton */}
              <div className="p-4 md:p-8">
                <div className="w-full h-10 md:h-12 bg-[#08286b]/70 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;