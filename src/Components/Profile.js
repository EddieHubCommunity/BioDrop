import React from "react";

import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

function Profile({ name, avatar }) {
  return (
    <div>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image={avatar}
          size="xlarge"
          shape="circle"
          className="p-overlay-badge"
        >
          <Badge value="4" severity="info" />
        </Avatar>
      </div>
      <div className="p-d-flex p-jc-center">
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Profile;
