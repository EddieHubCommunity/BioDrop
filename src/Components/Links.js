import React from "react";
import { Button } from "primereact/button";

function Links({ links }) {
  const colors = {
    youtube: "red",
    twitter: "blue",
    github: "green",
  };

  return (
    <div className="p-d-flex p-jc-center">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + "%" }}>
        {links.map((link) => (
          <Button
            className="p-p-3 p-m-2"
            style={{ color: colors[link.icon] }}
            key={link.url}
          >
            <i className={`pi pi-${link.icon} p-px-2`}></i>
            <span className="p-px-3">{link.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Links;
