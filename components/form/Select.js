import { classNames } from "@services/utils/classNames";
import Label from "./Label";

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
    <div>
      {label && (
        <Label htmlFor={name} className={className}>
          {label}
        </Label>
      )}
      <select
        id={name}
        defaultValue={value}
        onChange={onChange}
        className={classNames(
          "text-primary-high dark:bg-primary-high dark:text-white border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full sm:text-sm sm:leading-6",
          className,
        )}
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
    </div>
  );
}
