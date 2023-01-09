import { IconContext } from "react-icons";
import { FaListUl, FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineOnlinePrediction, MdOutlinePeople } from "react-icons/md";

export default function EventKey({ categorisedEvents, onToggleEventType }) {
  const filters = [
    {
      title: "Show all",
      description: "List all events with no filters",
      key: "all",
      icon: FaListUl,
    },
    {
      title: "CFP open",
      description: "You can submit a talk to this conference",
      key: "cfpOpen",
      icon: FaMicrophoneAlt,
    },
    {
      title: "In person",
      description: "These are in person events",
      key: "inPerson",
      icon: MdOutlinePeople,
    },
    {
      title: "Virtual",
      description: "Held virtually online event",
      key: "virtual",
      icon: MdOutlineOnlinePrediction,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
      {filters.map((filter) => (
        <div
          onClick={() => onToggleEventType(filter.key)}
          className="hover:scale-105 cursor-pointer transition-all 3s relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
          key={filter.key}
        >
          <div className="flex-shrink-0">
            <IconContext.Provider value={{ size: "3em" }}>
              <filter.icon />
            </IconContext.Provider>
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{filter.title}</p>
            <p className="truncate text-sm text-gray-500">
              {filter.description}
            </p>
          </div>
          <div className="text-2xl font-semibold">
            {categorisedEvents[filter.key].length}
          </div>
        </div>
      ))}
    </div>
  );
}
