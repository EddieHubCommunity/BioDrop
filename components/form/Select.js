export default function Select({
  value,
  onChange,
  options = [],
  label,
  name,
  className,
  ...restProps
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className={`sr-only ${className}`}>
          {label}
        </label>
      )}
      <select
        id={name}
        defaultValue={value}
        onChange={onChange}
        className={`mt-2 text-primary-high dark:bg-primary-high dark:text-white border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full sm:text-sm sm:leading-6 ${
          restProps.className || ""
        }`}
        {...restProps}
      >
        {options.map((option) => (
          <option
            className="checked:text-secondary-high checked:font-bold dark:checked:text-secondary-low-high"
            key={option.value}
            value={option.value}
          >
            {option.label || option}
          </option>
        ))}
      </select>
    </>
  );
}
