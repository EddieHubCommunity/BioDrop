import React from "react";

import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

function Profile({ name, bio, avatar, total }) {
  return (
    <div>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image={avatar}
          size="xlarge"
          shape="circle"
          className="p-overlay-badge"
        >
          <Badge value={total} severity="info" />
        </Avatar>
        <h1 className="p-m-2">{name}</h1>
      </div>
      <div className="p-d-flex p-jc-center">
        <p>{bio}</p>
      </div>
    </div>
  );
}

export default Profile;
