export function abbreviateNumber(n, locale = "en-US") {
  return Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  }).format(n);
}
