import React from "react";
import NextLink from "next/link";

export default function Link({ children, className, rel, ...restProps }) {
  return (
    <NextLink
      rel={rel ? rel : "noreferrer"}
      className={
        className
          ? className
          : "text-blue-600 underline decoration-dotted dark:text-blue-500 hover:underline hover:decoration-solid"
      }
      {...restProps}
    >
      {children}
    </NextLink>
  );
}
