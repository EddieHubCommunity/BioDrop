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
      icon={L.divIcon({
        className: "rounded-full",
        html: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      `,
        popupAnchor: [0, -10],
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })}
      position={[event.geometry.coordinates[1], event.geometry.coordinates[0]]}
    >
      <Popup>
        <div className="flex flex-col gap-[5px]">
          <h1 className="font-[600]">
            <Link href={event.properties.url}>
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
