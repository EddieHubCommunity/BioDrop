import Image from "next/image";


export default function ThemedImage({ lightImg, darkImg, alt, ...rest }) {
  return (
    <>
      <Image {...rest} src={lightImg} alt={alt} className="light-only" />
      <Image {...rest} src={darkImg} alt={alt} className="dark-only"/>
    </>
  )
}
