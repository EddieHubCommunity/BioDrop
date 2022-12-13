import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export default function getIcon(name) {
  let icon = FaIcons["FaGlobe"];
  if (!name) {
    return icon;
  }

  switch (name.slice(0, 2)) {
    case "Fa":
      icon = FaIcons[name];
      break;
    case "Md":
      icon = MdIcons[name];
      break;
  }

  return icon;
}
