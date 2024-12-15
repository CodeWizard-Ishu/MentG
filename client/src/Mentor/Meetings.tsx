import { useEffect, useState } from 'react';
import BACKEND_URL from "../endpoint"; // Adjust this import based on your project structure

// Define interfaces for type safety
interface Meeting {
  menteeName: string;
  dateTime: string;
  duration: string;
  status: string;
  amount: number;
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
      const mentorId = localStorage.getItem("userId");

      if (!mentorId) {
        setError("Mentor ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/mentor/${mentorId}/meetings?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }

        const data = await response.json();
        setMeetings(data.bookings);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setMeetings(data.bookings.map((meeting:any) => ({
          menteeName: meeting.menteeName,
          dateTime: new Date(meeting.dateTime).toLocaleString(), // Format date as needed
          duration: `${meeting.duration} mins`, // Format duration as needed
          status : meeting.status,
          amount : meeting.amount
        })));
        setTotalCount(data.totalBookingsCount); // Adjust based on your API response structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [pagination.pageIndex, pagination.pageSize]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">Recent Meetings</h1>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 text-gray-500 font-medium">Client</th>
              <th className="text-left p-3 text-gray-500 font-medium">Date</th>
              <th className="text-left p-3 text-gray-500 font-medium">Duration</th>
              <th className="text-left p-3 text-gray-500 font-medium">Status</th>
              <th className="text-left p-3 text-gray-500 font-medium">Amount</th> {/* New Amount Column */}
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{meeting.menteeName}</td>
                <td className="p-3">{meeting.dateTime}</td>
                <td className="p-3">{meeting.duration}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      meeting.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {meeting.status}
                  </span>
                </td>
                <td className="p-3">${meeting.amount.toFixed(2)}</td> {/* Display Amount with Two Decimal Places */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={pagination.pageIndex === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            {'< Previous'}
          </button>

          <span>
            Page{' '}
            <strong>
              {pagination.pageIndex + 1} of {totalPages}
            </strong>
          </span>

          <button
            onClick={handleNextPage}
            disabled={pagination.pageIndex >= totalPages - 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            {'Next >'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meetings;