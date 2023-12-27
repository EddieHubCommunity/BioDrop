import { forwardRef } from "react";
import Label from "./Label";

const Textarea = forwardRef(({ name, value, label, ...restProps },ref) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <textarea
      ref={ref}
        rows={4}
        name={name}
        id={name}
        className="block w-full rounded border-2 py-1.5 dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0 transition-all duration-250 ease-linear px-6 mb-2"
        defaultValue={value}
        {...restProps}
      />
    </div>
  );
});

Textarea.displayName="Textarea";

export default Textarea;