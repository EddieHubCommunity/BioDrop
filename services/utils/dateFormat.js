export default function dateFormat({ format = "long", date, locale = "en-GB" }) {
  let dateTimeStyle = { dateStyle: "short" };
  let formatLocale = locale;
  if (formatLocale === "local") {
    formatLocale = undefined;
  }

  switch (format) {
    case "short":
      dateTimeStyle = { month: "2-digit", day: "2-digit", year: "numeric" };
      break;
    case "long":
      dateTimeStyle = {
        dateStyle: "full",
        timeStyle: "medium",
      };
      break;
    case "longTz":
      dateTimeStyle = {
        dateStyle: "full",
        timeStyle: "long",
      };
  }

  return new Intl.DateTimeFormat(formatLocale, dateTimeStyle).format(new Date(date));
}
