function getAnchor(text) {
  let anchorTag = "";
  if (typeof text === "string") {
    anchorTag = text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/[ ]/g, "-");
    if (anchorTag.length > 20) {
      anchorTag = anchorTag.slice(0, 20);
    }
  }
  return anchorTag;
}
const H2 = ({ children }) => {
  const anchor = getAnchor(children);
  return anchor === "" ? <h2>{children}</h2> : <h2 id={anchor}>{children}</h2>;
};
export default H2;
