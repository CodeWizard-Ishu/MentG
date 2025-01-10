import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Calendar, User, IndianRupee } from "lucide-react";
import BACKEND_URL from "../endpoint";
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";

// Define interfaces for type safety
interface Stat {
  icon: ReactNode;
  title: string;
  value: string;
}

interface Meeting {
  menteeName: string;
  dateTime: string;
  duration: number;
  status: string;
}

interface DashboardProps {
  getProfilePicture?: (profilePicture: string) => void; // Function to receive profile picture
}

const Home: React.FC<DashboardProps> = ({ getProfilePicture = () => {} }) => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const mentorId = sessionStorage.getItem("userId");

      if (!mentorId) {
        // setError("Mentor ID not found in local storage.");
        setError("Something went wrong!");
        setLoading(false);
        return;
      }

      try {
        const token = sessionStorage.getItem("userToken") ?? "";

        // Make the fetch request with the Authorization header
        const response = await fetch(`${BACKEND_URL}/api/mentor/${mentorId}`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          // throw new Error("Failed to fetch mentor data");
          toast.error("Failed to fetch mentor data", {
            position: "bottom-right",
            pauseOnHover: false,
            transition: Bounce,
          });
        }

        const data = await response.json();
        getProfilePicture(data.profilePicture);
        setStats([
          {
            icon: <IndianRupee className="text-green-500" />,
            title: "Total Earnings",
            value: `Rs.${data.totalEarnings.toFixed(2)}`, // Format to 2 decimal places
          },
          {
            icon: <Calendar className="text-blue-500" />,
            title: "Upcoming Meetings",
            value: `${data.totalBookings}`, // Assuming totalBookings is a number
          },
          {
            icon: <User className="text-purple-500" />,
            title: "Total Clients",
            value: `${data.uniqueMentees}`, // Assuming uniqueMentees is a number
          },
        ]);

        setRecentMeetings(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.recentMeetings.map((meeting: any) => ({
            menteeName: meeting.menteeName,
            dateTime: new Date(meeting.dateTime).toLocaleString(), // Format date as needed
            duration: `${meeting.duration} mins`, // Format duration as needed
            status: meeting.status,
          }))
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="text-2xl font-semibold">{error}</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex items-center"
          >
            <div className="mr-4 flex-shrink-0">{stat.icon}</div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">{stat.title}</p>
              <h3 className="text-lg sm:text-2xl font-bold truncate">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Meetings */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
        <h1 className="text-xl font-bold mb-4">Recent Meetings</h1>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Client", "Date", "Duration", "Status"].map((header) => (
                    <th
                      key={header}
                      className="p-3 text-left text-xs sm:text-sm text-gray-500 font-medium"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentMeetings.map((meeting, index) => (
                  <tr key={index} className="hover:bg-gray-50">
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
                        className={`
                          px-2 sm:px-3 py-1 rounded-full text-xs
                          ${
                            meeting.status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        `}
                      >
                        {meeting.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mt-8">
        <h1 className="text-xl font-bold mb-4">Notifications</h1>
      </div>
    </div>
  );
};

export default Home;
