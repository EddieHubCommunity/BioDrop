const Heading = ({ children, id, fontSize = "medium", customClasses }) => {
  let fontSizeClass;
  switch (fontSize) {
    case "small":
      fontSizeClass = "text-base md:text-lg";
      break;
    case "medium":
      fontSizeClass = "text-xl md:text-2xl";
      break;
    case "large":
      fontSizeClass = "text-xl md:text-3xl";
      break;
    case "extraLarge":
      fontSizeClass = "text-3xl md:text-5xl";
      break;
    default:
      fontSizeClass = "text-xl md:text-2xl";
      break;
  }
  return (
    <h1 id={id} className={`font-bold mb-4 ${fontSizeClass} ${customClasses}`}>
      {children}
    </h1>
  );
};

export default Heading;
