import Image from "next/image";

export default function ThemedImage({
  lightImg,
  darkImg,
  alt,
  className,
  ...rest
}) {
  const light = className ? `light-only ${className}` : "light-only";
  const dark = className ? `dark-only ${className}` : "dark-only";

  return (
    <>
      <Image {...rest} src={lightImg} alt={alt} className={light} />
      <Image {...rest} src={darkImg} alt={alt} className={dark} />
    </>
  );
}
