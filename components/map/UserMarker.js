import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import Link from "@components/Link";
import { BASE_WEBSITE_URL } from "@constants/index";
import Markdown from "@components/Markdown";

export default function UserMarker({ user }) {
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
              href={`${BASE_WEBSITE_URL}${user.properties.username}`}
              className="text-primary-medium underline decoration-dotted hover:underline hover:decoration-solid break-all"
            >
              {user.properties.name}
            </Link>
          </h1>
          <span>{user.properties.location}</span>
          <span>
            <Markdown>{user.properties.bio}</Markdown>
          </span>
        </div>
      </Popup>
    </Marker>
  );
}
