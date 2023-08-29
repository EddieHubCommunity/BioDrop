import Image from "next/image";
import { useTheme } from "next-themes";

export default function ThemedImage({ lightImg, darkImg, alt, ...rest }) {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const imgSrc = currentTheme === "dark" ? darkImg : lightImg;

  return <Image src={imgSrc} alt={alt} {...rest} />;
}
