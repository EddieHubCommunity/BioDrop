export default function Select({
  eventType,
  handleEventTypeChange,
  options,
  label,
  className,
  ...restProps
}) {
  return (
    <>
      {label && (
        <label htmlFor="event-type" className={className}>
          {label}
        </label>
      )}
      <select
        id="event-type"
        defaultValue={eventType}
        onChange={handleEventTypeChange}
        className={`mt-2 text-primary-high dark:bg-primary-high dark:text-white border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full sm:text-sm sm:leading-6 ${
          restProps.className || ''
        }`}
        {...restProps}
      >
        {options.map((option) => (
          <option
            className="checked:text-secondary-high checked:font-bold dark:checked:text-secondary-low-high"
            key={option.value}
            value={option.value}
          >
            {option.name || option}
          </option>
        ))}
      </select>
    </>
  );
}
