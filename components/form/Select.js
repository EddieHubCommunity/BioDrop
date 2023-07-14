export default function Select({
  name,
  value,
  label,
  options = [],
  ...restProps
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="mt-4 mb-3">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className="mt-2 text-primary-high dark:bg-primary-high dark:text-white border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full sm:text-sm sm:leading-6"
        defaultValue={value}
        {...restProps}
      >
        {options.map((v) => (
          <option key={v} className="checked:text-secondary-high checked:font-bold dark:checked:text-secondary-low-high">{v}</option>
        ))}
      </select>
    </>
  );
}
