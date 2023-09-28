import { forwardRef } from "react";
import { classNames } from "@services/utils/classNames";
import Label from "./Label";

const Input = forwardRef(
  (
    {
      type = "text",
      name,
      value,
      placeholder,
      label,
      disabled = false,
      ...restProps
    },
    ref,
  ) => {
    const handleKeydown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.stopPropagation();
      }
    };
    let inputClassName = "";
    switch (type) {
      case "color":
        inputClassName = classNames(
          disabled
            ? "bg-primary-low-medium dark:bg-primary-medium-low hover:border-primary-medium-low focus:ring-0 focus:border-primary-medium focus:outline-0 cursor-not-allowed"
            : "dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0",
          "border-2 transition-all duration-250 ease-linear rounded px-1 mb-2 block w-[100px]",
        );
        break;
      default:
        inputClassName = classNames(
          disabled
            ? "bg-primary-low-medium dark:bg-primary-medium-low hover:border-primary-medium-low focus:ring-0 focus:border-primary-medium focus:outline-0 cursor-not-allowed"
            : "dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0",
          "border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full",
        );
    }

    return (
      <>
        {label && <Label htmlFor={name}>{label}</Label>}

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={inputClassName}
          id={name}
          name={name}
          value={value}
          onKeyDown={handleKeydown}
          {...restProps}
        />
      </>
    );
  },
);

Input.displayName = "Input";
export default Input;
