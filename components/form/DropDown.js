import React from "react";

export default function DropdownMenu({ eventType, handleEventTypeChange, options, label, className }){
  return (
    <div className="text-center">
      <label htmlFor="event-type" className={className}>
        {label}
      </label>
      <select
        id="event-type"
        value={eventType}
        onChange={handleEventTypeChange}
        className="border border-primary-low-medium rounded-md shadow-sm px-2 py-1 text-sm text-primary-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent  m-3 w-60"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

