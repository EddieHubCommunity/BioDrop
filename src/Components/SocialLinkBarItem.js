import React from "react";
import { Button } from "primereact/button";

function SocialLinkBarItem({ name, iconName, url }) {
  return (
    // <a href={url} target="_blank" style={{ textDecoration: "none" }}>
      <Button className="p-p-3 p-m-2">
        <i className={`pi pi-${iconName} p-px-2`}></i>
        <span className="p-px-3">{name}</span>
      </Button>
    // </a>
  );
}

export default SocialLinkBarItem;
