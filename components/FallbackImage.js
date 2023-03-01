import { useState } from "react";
import Image from "next/legacy/image";

export default function FallbackImage({ src, alt, fallback = "A A", ...rest }) {
  const [imgSrc, setImgSrc] = useState(src);
  const fallbackUrl = `https://avatars.dicebear.com/api/initials/${fallback}.svg`;

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc ? imgSrc : fallbackUrl}
      onError={() => setImgSrc(fallbackUrl)}
    />
  );
}
