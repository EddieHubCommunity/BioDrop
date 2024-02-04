import { IconContext } from "react-icons";
import { FaMicrophoneLines } from "react-icons/fa6";
import { TbCoin, TbCoinOff } from "react-icons/tb";
import {
  MdOutlineOnlinePrediction,
  MdOutlinePeople,
  MdOutlineDoneAll,
  MdTimelapse,
} from "react-icons/md";
import { RiCalendarTodoFill } from "react-icons/ri";

export default function EventKey({ categorizedEvents, onToggleEventType }) {
  const filters = [
    {
      title: "All future events",
      description: "List all upcoming events",
      key: "future",
      icon: RiCalendarTodoFill,
    },
    {
      title: "All ongoing events",
      description: "List all ongoing events",
      key: "ongoing",
      icon: MdTimelapse,
    },
    {
      title: "CFP open",
      description: "You can submit a talk to this conference",
      key: "cfpOpen",
      icon: FaMicrophoneLines,
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
    {
      title: "Past Events",
      description: "Events already held",
      key: "past",
      icon: MdOutlineDoneAll,
    },
    {
      title: "Free",
      description: "These events are free to attend",
      key: "free",
      icon: TbCoinOff,
    },
    {
      title: "Paid",
      description: "These events are paid to attend",
      key: "paid",
      icon: TbCoin,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
      {filters.map((filter) => (
        <div
          onClick={() => onToggleEventType(filter.key)}
          className="hover:scale-105 cursor-pointer transition-all 3s relative flex items-center space-x-3 rounded-lg border border-primary-medium-low bg-white dark:border-none dark:bg-primary-medium px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-secondary-medium focus-within:ring-offset-2"
          key={filter.key}
        >
          <div className="flex-shrink-0">
            <IconContext.Provider value={{ size: "3em" }}>
              <filter.icon />
            </IconContext.Provider>
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-primary-high dark:text-white">
              {filter.title}
            </p>
            <p className="truncate text-sm text-primary-medium dark:text-primary-low-high">
              {filter.description}
            </p>
          </div>
          <div className="text-2xl font-semibold">
            {categorizedEvents[filter.key].length}
          </div>
        </div>
      ))}
    </div>
  );
}
