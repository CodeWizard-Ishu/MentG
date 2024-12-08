interface Meeting {
  client: string;
  date: string;
  duration: string;
  status: "Completed" | "Upcoming";
}

const Meetings = () => {
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
    <>
      <h2 className="text-xl font-bold mb-4">All Meetings</h2>
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
                  className={`px-3 py-1 rounded-full text-xs ${
                    meeting.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {meeting.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Meetings;
