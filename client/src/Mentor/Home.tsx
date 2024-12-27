import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Calendar, User, DollarSign } from "lucide-react";
import BACKEND_URL from "../endpoint"; // Adjust this import based on your project structure
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";

// Define interfaces for type safety
interface Stat {
  icon: ReactNode;
  title: string;
  value: string;
}

interface Meeting {
  menteeName: string; // Changed to match your backend response
  dateTime: string; // Changed to match your backend response
  duration: number; // Changed to match your backend response
  status: string;
}

const Home = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const mentorId = localStorage.getItem("userId");

      if (!mentorId) {
        // setError("Mentor ID not found in local storage.");
        setError("Something went wrong!")
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/mentor/${mentorId}`);
        if (!response.ok) {
          // throw new Error("Failed to fetch mentor data");
          toast.error("Failed to fetch mentor data",{
            position: "bottom-right",
            pauseOnHover: false,
            transition: Bounce,
          })
        }

        const data = await response.json();
        setStats([
          {
            icon: <DollarSign className="text-green-500" />,
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setRecentMeetings(data.recentMeetings.map((meeting:any) => ({
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
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="text-2xl font-semibold">{error}</div>
  
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex items-center"
          >
            <div className="mr-4">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Meetings */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">Recent Meetings</h1>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Client", "Date", "Duration", "Status"].map((header) => (
                <th
                  key={header}
                  className="text-left p-3 text-gray-500 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentMeetings.map((meeting, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{meeting.menteeName}</td>
                <td className="p-3">{meeting.dateTime}</td>
                <td className="p-3">{meeting.duration}</td>
                <td className="p-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs 
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

      {/* Notifications Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-xl font-bold mb-4">Notifications</h1>
        {/* Add notification content here */}
      </div>
    </div>
  );
};

export default Home;
