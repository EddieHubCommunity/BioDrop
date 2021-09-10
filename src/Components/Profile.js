import React from "react";

import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

function Profile() {
  return (
    <div>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image="eddiejaoude.jpg"
          size="xlarge"
          shape="circle"
          className="p-overlay-badge"
        >
          <Badge value="4" severity="info" />
        </Avatar>
      </div>
      <div className="p-d-flex p-jc-center">
        <p>Founder of EddieHub</p>
      </div>
    </div>
  );
}

export default Profile;
