import React from "react";
import { QRCodeSVG } from "qrcode.react";
import LogoWide from "@public/logos/LogoWide";

function QRcodeWallpaper({ BASE_URL, data }) {
  const fallbackImageSize = 120;

  return (
    <div style={{ marginTop: "50%", marginLeft: "16%" }}>
      <QRCodeSVG
        className="border border-white"
        value={`${BASE_URL}/${data.username}`}
        size={fallbackImageSize * 6}
      />
      <div style={{ marginLeft: "7rem", marginTop: "5rem" }}>
        <LogoWide width={512} />
      </div>
    </div>
  );
}

export default QRcodeWallpaper;
