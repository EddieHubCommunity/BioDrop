export default function dateFormat({
  format = "long",
  locales = undefined,
  date,
}) {
  let dateTimeStyle = { dateStyle: "short" };

  switch (format) {
    case "short":
      dateTimeStyle = { dateStyle: "short" };
      break;
    case "long":
      dateTimeStyle = {
        dateStyle: "full",
        timeStyle: "long",
      };
      break;
  }

  return new Intl.DateTimeFormat(locales, dateTimeStyle).format(new Date(date));
}
