export function formatDate(date, locale = "en-GB") {
  const options = {
    dateStyle: "full",
    timeStyle: "long",
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}
