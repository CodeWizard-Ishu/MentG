import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Calendar, User, IndianRupee } from "lucide-react";
import BACKEND_URL from "../endpoint";
import { HomeSkeleton } from "../components/ui/Skeletons/MentorDashboardSkeletons";
import { Link } from "react-router-dom";

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
  getProfilePicture?: (profilePicture: string) => void;
}

const Home: React.FC<DashboardProps> = ({ getProfilePicture = () => {} }) => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mentorId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";
  const userName = localStorage.getItem("fullName");

  useEffect(() => {
    const fetchData = async () => {
      if (!mentorId) {
        setError("Something went wrong!");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/mentor/${mentorId}`, {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch mentor data");
        }

        const data = await response.json();
        if (data.profilePicture) getProfilePicture(data.profilePicture);
        setStats([
          {
            icon: <IndianRupee className="text-green-500" />,
            title: "Total Earnings",
            value: `Rs.${data.totalEarnings.toFixed(2)}`,
          },
          {
            icon: <Calendar className="text-blue-500" />,
            title: "Upcoming Meetings",
            value: `${data.totalBookings}`,
          },
          {
            icon: <User className="text-purple-500" />,
            title: "Total Mentees",
            value: `${data.uniqueMentees}`,
          },
        ]);

        setRecentMeetings(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.recentMeetings.map((meeting: any) => ({
            menteeName: meeting.menteeName,
            dateTime: new Date(meeting.dateTime).toLocaleString(),
            duration: `${meeting.duration} mins`,
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) return <HomeSkeleton/>;
  if (error) return <div className="text-2xl font-semibold">{error}</div>;

  return (
    <div className="space-y-6 mb-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#C33764] to-[#08286b] rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-6 md:p-8 text-white flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{getGreeting()}, {(userName || "Mentor")}!</h1>
            <p className="text-white mb-4">Welcome to your dashboard. Here's an overview of your mentoring journey</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to={"/dashboard/messages"} className="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2 rounded-md font-medium text-sm">
                Messages
              </Link>
              <Link to={"/dashboard/calendar"} className="bg-transparent text-white border border-white hover:bg-white/10 transition-colors px-4 py-2 rounded-md font-medium text-sm">
                View Calendar
              </Link>
            </div>
          </div>
          <div className="hidden md:flex p-8 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
              <Calendar className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-blue-700/30 px-6 py-3 text-white text-sm">
          {recentMeetings.length > 0 ? (
            <p>
              Your next meeting is with <span className="font-bold">{recentMeetings[0]?.menteeName}</span> on{" "}
              <span className="font-bold">{recentMeetings[0]?.dateTime}</span>
            </p>
          ) : (
            <p>You have no upcoming meetings scheduled.</p>
          )}
        </div>
      </div>
      {/* Stats Cards */}
      <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Quick Stats</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
      </div>

      {/* Recent Meetings */}
      <div className="px-6">
        <h1 className="text-xl font-bold mb-2">Recent Meetings</h1>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Mentee", "Date", "Duration", "Status"].map((header) => (
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
      </div>

      {/* Notifications Section */}
      {/* <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-xl font-bold mb-4">Notifications</h1>
      </div> */}
    </div>
  );
};

export default Home;
