import { useEffect, useState } from "react";
import Image from "next/image";

export const FallbackImage = ({ src, alt, fallback, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const fallbackUrl = `https://avatars.dicebear.com/api/initials/${fallback}.svg`;

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc ? imgSrc : fallbackUrl}
      onError={() => setImgSrc(fallbackUrl)}
    />
  );
};
