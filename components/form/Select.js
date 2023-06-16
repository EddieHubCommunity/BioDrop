export default function Select({
  name,
  value,
  placeholder,
  label,
  options = [],
  ...restProps
}) {
  console.log(value);
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
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={value}
        {...restProps}
      >
        {options.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    </>
  );
}
