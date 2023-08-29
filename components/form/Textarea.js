export default function Textarea({ name, value, label, ...restProps }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-primary-high dark:text-primary-low"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name={name}
          id={name}
          className="block w-full rounded border-2 py-1.5 dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0 transition-all duration-250 ease-linear px-6 mb-2"
          defaultValue={value}
          {...restProps}
        />
      </div>
    </div>
  );
}
