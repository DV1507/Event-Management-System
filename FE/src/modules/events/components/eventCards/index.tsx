import { useEffect, useState } from "react";

const eventData = [
  {
    name: "Tech Conference 2025",
    desc: "A conference for tech enthusiasts to discuss the latest in technology.",
    startDate: "2025-06-15",
    endDate: "2025-06-17",
  },
  {
    name: "React Workshop",
    desc: "An interactive workshop on learning React.js.",
    startDate: "2025-07-10",
    endDate: "2025-07-11",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
  {
    name: "Webinar on AI",
    desc: "A deep dive into the world of Artificial Intelligence and its future.",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
  },
];
const EventCards = () => {
  const [events, setEvents] = useState<
    {
      name: string;
      desc: string;
      startDate: string;
      endDate: string;
    }[]
  >([]);
  useEffect(() => {
    setTimeout(() => {
      setEvents(eventData);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col space-y-6 py-6">
      {events.map((event, index) => (
        <div key={index} className="max-w-sm bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {event.name}
          </h3>
          <p className="text-gray-600 mb-4">{event.desc}</p>

          <div className="space-y-2">
            <div>
              <label className="block text-gray-700 font-semibold">
                Start Date
              </label>
              <p className="text-gray-700">{event.startDate}</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                End Date
              </label>
              <p className="text-gray-700">{event.endDate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCards;
