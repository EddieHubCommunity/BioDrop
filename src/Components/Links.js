import React from "react";
import LinkItem from "./LinkItem";

function Links({ links }) {
  return (
    <div className="p-d-flex p-jc-center">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + "%" }}>
        {links.map((link, index) => (
          <LinkItem key={index} link={link} />
        ))}
      </div>
    </div>
  );
}

export default Links;
