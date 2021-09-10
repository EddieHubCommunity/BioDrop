import React from "react";
import { Button } from "primereact/button";

function LinkItem({ link }) {
  const colors = {
    youtube: "red",
    twitter: "blue",
    github: "green",
  };

  const openURL = (url) => {
    window.open(url, "_blank");
  };
  return (
    <Button
      className="p-p-3 p-m-2"
      style={{ color: colors[link.icon] }}
      key={link.url}
      onClick={()=>openURL(link.url)}
    >
      <i className={`pi pi-${link.icon} p-px-2`}></i>
      <span className="p-px-3">{link.name}</span>
    </Button>
  );
}

export default LinkItem;
