import React from "react";
import { classNames } from "@services/utils/classNames";
import Link from "./Link";
import { cva } from "class-variance-authority";




  const buttonVariants = cva(
    "w-full inline-flex items-center flex-1 justify-center cursor-pointer rounded-md border-2 border-primary-high dark:border-white hover:border-transparent px-5 py-3 text-base font-medium first-letter:bg-white transition duration-400 ease-in-out",
    {
      variants: {
        variant: {
          primary:
            " text-primary-medium bg-secondary-medium hover:bg-tertiary-medium",
          default:
            "text-secondary-high dark:text-secondary-high-high hover:text-white dark:hover:text-white dark:bg-primary-low hover:bg-secondary-medium dark:hover:bg-secondary-medium",
          disabled:
            "border-2 border-red border shadow-sm bg-primary-low text-primary-medium cursor-not-allowed",
        },
      },

      defaultVariants: {
        variant: "default",
      },
    },
  );

  /**
 * @typedef {Object} ButtonProps
 * @property {boolean} [disabled]
 * @property {"primary" | "secondary" | "disabled"} [variant]
 * @property {string} [className]
 * @property {string} [href]
 * @property {string} [ref]
 * @property {React.ReactNode} [children]
 */

/**
 * @type {React.ForwardRefExoticComponent<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>}
 */
const Button = React.forwardRef(function({
  disabled = false,
  className,
  variant,
  href,
  children,
  ...restProps
}, ref) {
  const Component = href ? Link : "button";
  const componentProps = {
    ref,
    className: classNames(buttonVariants({ variant, className })),
    disabled,
    ...restProps
  };
  if (href) {
    componentProps["href"] = href; 
  }

  return <Component {...componentProps}>{children}</Component>;
});

Button.displayName = "Button";
export default Button;
