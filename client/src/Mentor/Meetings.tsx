import { useEffect, useState } from "react";
import BACKEND_URL from "../endpoint"; // Adjust this import based on your project structure
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";
import ReportMenu from "./ReportMenu";

// Define interfaces for type safety
interface Meeting {
  menteeName: string;
  dateTime: string;
  duration: string;
  status: string;
  amount: number;
  menteeId: number;
}

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // Set default page size
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      const mentorId = sessionStorage.getItem("userId");

      if (!mentorId) {
        // setError("Mentor ID not found in local storage.");
        setError("Something went Wrong!");
        setLoading(false);
        return;
      }

      try {
        const token = sessionStorage.getItem("userToken") ?? "";
        const response = await fetch(
          `${BACKEND_URL}/api/mentor/${mentorId}/meetings?page=${
            pagination.pageIndex + 1
          }&limit=${pagination.pageSize}`,
          {
            method: "GET",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          // throw new Error("Failed to fetch meetings");
          toast.error("Failed to fetch meetings", {
            position: "bottom-right",
            pauseOnHover: false,
            transition: Bounce,
          });
        }

        const data = await response.json();
        setMeetings(data.bookings);
        setMeetings(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.bookings.map((meeting: any) => ({
            menteeName: meeting.menteeName,
            dateTime: new Date(meeting.dateTime).toLocaleString(), // Format date as needed
            duration: `${meeting.duration} mins`, // Format duration as needed
            status: meeting.status,
            amount: meeting.amount,
            menteeId: meeting.menteeId,
          }))
        );
        setTotalCount(data.totalBookingsCount); // Adjust based on your API response structure
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [pagination.pageIndex, pagination.pageSize]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-2xl font-semibold">{error}</div>;

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  // Handle pagination changes
  const handleNextPage = () => {
    if (pagination.pageIndex < totalPages - 1) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.pageIndex > 0) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
    }
  };

  return (
    <div>
      {/* Recent Meetings */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
        <h1 className="text-xl font-bold mb-4">Recent Meetings</h1>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-xs sm:text-sm text-gray-500 font-medium">
                    Client
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
                      <ReportMenu/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={pagination.pageIndex === 0}
          className="px-4 py-2 text-sm md:text-base bg-gray-300 rounded disabled:bg-gray-200"
        >
          {"< Previous"}
        </button>

        <span className="text-sm md:text-base">
          Page{" "}
          <strong>
            {pagination.pageIndex + 1} of {totalPages}
          </strong>
        </span>

        <button
          onClick={handleNextPage}
          disabled={pagination.pageIndex >= totalPages - 1}
          className="px-4 py-2 text-sm md:text-base bg-gray-300 rounded disabled:bg-gray-200"
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
};

export default Meetings;
