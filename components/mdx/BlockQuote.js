import React from "react";

const BlockQuote = ({ children }) => {
  return (
    <blockquote className="text-primary-medium dark:text-primary-low-medium">
      {children}
    </blockquote>
  );
};

export default BlockQuote;
