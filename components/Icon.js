import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

export default function getIcon(name) {
  let icon = FaIcons["FaGlobe"];
  if (!name) {
    return icon;
  }

  switch (name.slice(0, 2)) {
    case "Fa":
      icon = FaIcons[name];
      break;
    case "Si":
      icon = SiIcons[name];
      break;
  }

  if (!icon) {
    return FaIcons["FaGlobe"];
  }

  return icon;
}
