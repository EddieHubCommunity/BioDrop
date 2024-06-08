import FallbackImage from "@components/FallbackImage";
import Link from "@components/Link";
import { classNames } from "@services/utils/classNames";

export default function Avatar({
  alt,
  src,
  username,
  size = 100,
  href,
  radius = "full",
  isBordered,
  borderColor = "primary-low",
  className,
}) {
  return href ? (
    <Link href={href}>
      <FallbackImage
        className={classNames(
          `inline-block flex-none hover:ring-2 hover:ring-tertiary-medium rounded-${radius} cursor-pointer`,
          className,
          isBordered && `ring-2 ring-${borderColor}`,
        )}
        src={src}
        alt={alt}
        fallback={username}
        width={size}
        height={size}
      />
    </Link>
  ) : (
    <FallbackImage
      className={classNames(
        `inline-block flex-none rounded-${radius}`,
        className,
        isBordered && `ring-2 ring-${borderColor}`,
      )}
      src={src}
      alt={alt}
      fallback={username}
      width={size}
      height={size}
    />
  );
}
