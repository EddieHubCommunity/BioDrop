export default function Input({ name, value, placeholder, ...restProps }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border-2 hover:border-tertiary-medium transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
      name={name}
      value={value}
      {...restProps}
    />
  );
}
