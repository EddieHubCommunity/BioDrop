import dynamic from 'next/dynamic';

export default function getIcon(name = "FaGlobe") {
let icon;

  switch (name.slice(0, 2)) {
    case "Fa":
      icon = dynamic(() =>
        import('react-icons/fa').then((mod) => mod[name]).catch(() => null)
      )
      break;
    case "Si":
      icon = dynamic(() =>
        import('react-icons/si').then((mod) => mod[name]).catch(() => null)
      )
      break;
  }

  if (!icon) {
    return dynamic(() =>
      import('react-icons/fa').then((mod) => mod.FaGlobe)
    )
  }

  return icon;
}
