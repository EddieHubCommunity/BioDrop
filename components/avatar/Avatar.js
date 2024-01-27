import FallbackImage from "@components/FallbackImage";
import Link from "@components/Link";
import { classNames } from "@services/utils/classNames";

export default function Avatar({
  alt,
  src,
  size = "md",
  href,
  radius = "full",
  isBordered,
  borderColor = "primary-low",
  className,
}) {
  const getAvatarSize = () => {
    switch (size) {
      case "sm":
        return 25;
      case "md":
        return 50;
      case "lg":
        return 75;

      default:
        return 100;
    }
  };

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
        width={typeof size !== "number" ? getAvatarSize() : size}
        height={typeof size !== "number" ? getAvatarSize() : size}
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
      width={typeof size !== "number" ? getAvatarSize() : size}
      height={typeof size !== "number" ? getAvatarSize() : size}
    />
  );
}
