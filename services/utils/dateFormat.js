export default function dateFormat({ format = "long", date }) {
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

  return new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(new Date(date));
}
