import { ReactNode } from "react";
import {
  Calendar,
  User,
  DollarSign,
} from "lucide-react";

// Define interfaces for type safety
interface Stat {
  icon: ReactNode;
  title: string;
  value: string;
}

interface Meeting {
  client: string;
  date: string;
  duration: string;
  status: "Completed" | "Upcoming";
}

const Home = () => {
  const stats: Stat[] = [
    {
      icon: <DollarSign className="text-green-500" />,
      title: "Total Earnings",
      value: "$4,520",
    },
    {
      icon: <Calendar className="text-blue-500" />,
      title: "Upcoming Meetings",
      value: "12",
    },
    {
      icon: <User className="text-purple-500" />,
      title: "Total Clients",
      value: "42",
    },
  ];

  const recentMeetings: Meeting[] = [
    {
      client: "Sarah Johnson",
      date: "Dec 3, 2024",
      duration: "45 mins",
      status: "Completed",
    },
    {
      client: "Mike Anderson",
      date: "Dec 5, 2024",
      duration: "30 mins",
      status: "Upcoming",
    },
  ];

  return (
    <div className="">
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
                <td className="p-3">{meeting.client}</td>
                <td className="p-3">{meeting.date}</td>
                <td className="p-3">{meeting.duration}</td>
                <td className="p-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs 
                      ${
                        meeting.status === "Completed"
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
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h1 className="text-xl font-bold mb-4">Notifications</h1>
      </div>
    </div>
  );
};

export default Home;
