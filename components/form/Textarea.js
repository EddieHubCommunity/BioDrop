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
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={value}
          {...restProps}
        />
      </div>
    </div>
  );
}
