import React, { useEffect } from "react";
import SocialLinkBarItem from "./SocialLinkBarItem";

function SocialLinkBar({ links = [] }) {
  return (
    <div className="p-d-flex p-jc-center">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + "%" }}>
        {links.map((link, index) => (
          <SocialLinkBarItem
            key={index}
            name={link.name}
            iconName={link.icon}
            url={link.url}
          />
        ))}
      </div>
    </div>
  );
}

export default SocialLinkBar;
