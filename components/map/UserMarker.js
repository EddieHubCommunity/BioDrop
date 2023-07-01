import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "@components/Link";

export default function UserMarker({user}) {
  // Custom component for rendering links within ReactMarkdown
  const LinkRenderer = ({ href, children }) => (
    <Link href={href}>
      {children}
    </Link>
  );

  return (
    <Marker
      icon={L.icon({
        className: "rounded-full",
        iconUrl: `https://github.com/${user.properties.username}.png`,
        popupAnchor: [0, -10],
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })}
      position={[user.geometry.coordinates[1], user.geometry.coordinates[0]]}
    >
      <Popup>
        <div className="flex flex-col gap-[5px]">
          <h1 className="font-[600]">
            <Link
              href={`https://linkfree.eddiehub.io/${user.properties.username}`}
            >
              {user.properties.name}
            </Link>
          </h1>
          <span>{user.properties.location}</span>
          <span>
            <ReactMarkdown  components={{ a: LinkRenderer }}>{user.properties.bio}</ReactMarkdown>
          </span>
        </div>
      </Popup>
    </Marker>
  )
}