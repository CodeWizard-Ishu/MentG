import { useEffect, useState } from "react";
import BACKEND_URL from "../endpoint";
import ReportMenu from "./ReportMenu";
import { MeetingsSkeleton } from "../components/ui/Skeletons/MentorDashboardSkeletons";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Meeting {
  menteeName: string;
  dateTime: string;
  duration: string;
  status: string;
  amount: number;
  menteeId: number;
}

// Utility function to format UTC datetime to IST
const formatToIST = (utcDateStr: string) => {
  const date = new Date(utcDateStr);

  // Convert to IST (UTC+5:30)
  const istOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-IN", istOptions).format(date);
};

const pageSize = 5;

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mentorId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!mentorId) {
        setError("Something went Wrong!");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/mentor/${mentorId}/meetings?page=${currentPage}&limit=${pageSize}`,
          {
            method: "GET",
            headers: {
              "Authorization": token,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }

        const data = await response.json();
        setMeetings(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.bookings.map((meeting: any) => ({
            menteeName: meeting.menteeName,
            dateTime: formatToIST(meeting.dateTime),
            duration: `${meeting.duration} mins`,
            status: meeting.status,
            amount: meeting.amount,
            menteeId: meeting.menteeId,
          }))
        );
        setTotalCount(data.totalBookingsCount);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [mentorId, currentPage, token]);

  // Handle pagination changes
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (startPage === 2) endPage = Math.min(4, totalPages - 1);
      if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);
      
      if (startPage > 2) pageNumbers.push('...');
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages - 1) pageNumbers.push('...');
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  if (loading) return <MeetingsSkeleton/>;
  if (error) return <div className="text-2xl font-semibold">{error}</div>;

  return (
    <div className="p-4 sm:p-6">
      {/* Recent Meetings */}
      <h1 className="text-xl font-bold mb-4">Recent Meetings</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-xs sm:text-sm text-gray-500 font-medium">
                    Mentee
                  </th>
                  <th className="p-3 text-left text-xs sm:text-sm text-gray-500 font-medium">
                    Date
                  </th>
                  <th className="p-3 text-left text-xs sm:text-sm text-gray-500 font-medium">
                    Duration
                  </th>
                  <th className="p-3 text-left text-xs sm:text-sm text-gray-500 font-medium">
                    Status
                  </th>
                  <th className="p-3 text-left text-xs sm:text-sm text-gray-500 font-medium">
                    Amount
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm whitespace-nowrap">
                      {meeting.menteeName}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {meeting.dateTime}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {meeting.duration}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs ${
                          meeting.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {meeting.status}
                      </span>
                    </td>
                    <td className="p-3">Rs.{meeting.amount.toFixed(2)}</td>
                    <td>
                      <ReportMenu
                        menteeId={meeting.menteeId}
                        menteeName={meeting.menteeName}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="mt-6">
          {/* Mobile View (Small Screens) */}
          <div className="sm:hidden flex flex-col gap-2">
            <div className="flex justify-center gap-14 w-full">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex p-2 w-28 justify-center text-white text-sm bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
              >
                <ChevronLeft size={22}/> Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="flex p-2 w-28 justify-center text-white text-sm bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
              >
                Next <ChevronRight size={22}/>
              </button>
            </div>
            <div className="flex justify-center items-center space-x-2 overflow-x-auto py-2">
              {getPageNumbers().map((page, index) => (
                page === '...' ? 
                <span key={`ellipsis-${index}`} className="px-2">...</span> :
                <button
                  key={`page-${page}`}
                  onClick={() => typeof page === 'number' && handlePageClick(page)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentPage === page 
                      ? 'bg-[#08286b] text-white font-semibold transition-colors duration-300' 
                      : 'bg-gray-400 hover:bg-gray-300 transition-colors duration-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          
          {/* Desktop View (Medium screens and up) */}
          <div className="hidden sm:flex items-center justify-center gap-16">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex p-2 w-28 justify-center text-white text-sm md:text-base bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
            >
              <ChevronLeft/> Previous
            </button>

            <div className="flex items-center space-x-2">
              {getPageNumbers().map((page, index) => (
                page === '...' ? 
                <span key={`ellipsis-${index}`} className="px-2">...</span> :
                <button
                  key={`page-${page}`}
                  onClick={() => typeof page === 'number' && handlePageClick(page)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentPage === page 
                      ? 'bg-[#08286b] text-white font-semibold transition-colors duration-300' 
                      : 'bg-gray-400 hover:bg-gray-500 transition-colors duration-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="flex p-2 w-28 justify-center text-white text-sm md:text-base bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
            >
              Next <ChevronRight/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;