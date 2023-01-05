import { IconContext } from "react-icons";
import { MdOutlineOnlinePrediction, MdOutlinePeople } from "react-icons/md";

export default function EventKey({ events, onToggleEventType }) {
  const inPersonEvents = events.filter((event) => event.isInPerson).length;
  const virtualEvents = events.filter((event) => event.isVirtual).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
      <div
        onClick={() => onToggleEventType("in-person")}
        className="hover:scale-105 cursor-pointer transition-all 3s relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
      >
        <div className="flex-shrink-0">
          <IconContext.Provider value={{ size: "3em" }}>
            <MdOutlinePeople />
          </IconContext.Provider>
        </div>
        <div className="min-w-0 flex-1">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">In person</p>
          <p className="truncate text-sm text-gray-500">
            These are in person events
          </p>
        </div>
        <div className="text-2xl font-semibold">{inPersonEvents}</div>
      </div>
      <div
        onClick={() => onToggleEventType("virtual")}
        className="hover:scale-105 cursor-pointer transition-all 3s relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
      >
        <div className="flex-shrink-0">
          <IconContext.Provider value={{ size: "3em" }}>
            <MdOutlineOnlinePrediction />
          </IconContext.Provider>
        </div>
        <div className="min-w-0 flex-1">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">Virtual</p>
          <p className="truncate text-sm text-gray-500">
            These are virtual events held online
          </p>
        </div>
        <div className="text-2xl font-semibold">{virtualEvents}</div>
      </div>
    </div>
  );
}
