export default function dateFormat({ format = "long", date, locale = "en-GB", UTCLocal = false }) {
  let dateTimeStyle;
  let formatLocale = locale;
  let formatDate = date;
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
        timeStyle: "long",
      };
  }

  /* Used by statistics to display timestamps */
  if (UTCLocal) {
    dateTimeStyle = {
      ...dateTimeStyle,
      timeZone: 'UTC'
    }
  }

  return new Intl.DateTimeFormat(formatLocale, dateTimeStyle).format(new Date(formatDate));
}
