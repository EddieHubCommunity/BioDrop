import dynamic from "next/dynamic";

function defaultIcon() {
  return dynamic(() => import("react-icons/fa6").then((mod) => mod.FaGlobe));
}

export default function getIcon(name = "FaGlobe") {
  let icon;

  switch (name.slice(0, 2)) {
    case "Fa":
      icon = dynamic(() =>
        import("react-icons/fa6").then((mod) => {
          let node = mod[name];
          if (!node) node = defaultIcon();
          return node;
        }),
      );
      break;
    case "Si":
      icon = dynamic(() =>
        import("react-icons/si").then((mod) => {
          let node = mod[name];
          if (!node) node = defaultIcon();
          return node;
        }),
      );
      break;
  }

  if (!icon) {
    return defaultIcon();
  }

  return icon;
}
