import { useEffect } from "react";
import QRCodeStyling from "styled-qr-code";

function QRStyledCanvas({
  parentRef,
  backgroundOptions = {},
  cornersDotOptions = {},
  cornersSquareOptions = {},
  value,
  dotsOptions = {},
  height = 100,
  image = "",
  imageOptions = {},
  margin = 0,
  qrOptions = {},
  type = "canvas",
  width = 100,
}) {
  const qrCode = new QRCodeStyling();

  useEffect(() => {
    qrCode.append(parentRef.current);
    qrCode.update({
      backgroundOptions: backgroundOptions,
      cornersDotOptions: cornersDotOptions,
      cornersSquareOptions: cornersSquareOptions,
      data: value,
      dotsOptions: dotsOptions,
      height: height,
      image: image,
      imageOptions: imageOptions,
      margin: margin,
      qrOptions: qrOptions,
      type: type,
      width: width,
    });
  });
}

export default QRStyledCanvas;
