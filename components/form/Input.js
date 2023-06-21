export default function Input({
  type = "text",
  name,
  value,
  placeholder,
  label,
  disabled = false,
  ...restProps
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="mt-4 mb-3">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full ${
          disabled
            ? "bg-primary-low-medium dark:bg-primary-medium-low hover:border-primary-medium-low focus:ring-0 focus:border-primary-medium focus:outline-0 cursor-not-allowed"
            : "dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0"
        }"}`}
        id={name}
        name={name}
        value={value}
        {...restProps}
      />
    </>
  );
}
