import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "@components/Link";

export default function EventMarker({event}) {
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
        iconUrl: "/placard.png",
        popupAnchor: [0, -10],
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })}
      position={[event.geometry.coordinates[1], event.geometry.coordinates[0]]}
    >
      <Popup>
        <div className="flex flex-col gap-[5px]">
          <h1 className="font-[600]">
            <Link href={`${event.properties.url}`}>
              {event.properties.name}
            </Link>
          </h1>
          <span>
            {[
              event.properties.location.city,
              event.properties.location.state,
              event.properties.location.country,
            ]
              .filter((x) => x)
              .join(", ")}
          </span>
          <span>
            <ReactMarkdown components={{ a: LinkRenderer }}>
              {event.properties.description}
            </ReactMarkdown>
          </span>
          <span>
            {`${new Date(event.properties.date.start).toLocaleDateString()} - 
              ${new Date(event.properties.date.end).toLocaleDateString()}`}
          </span>
        </div>
      </Popup>
    </Marker>
  )
}
