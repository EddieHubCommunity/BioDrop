import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "leaflet/dist/leaflet.css";

import Link from "@components/Link";
import MarkerCluster from "@components/map/MarkerCluster";

export default function Map({ users }) {
  return (
    <>
      <MapContainer
        style={{ height: "100vh", width: "width: 100vw", zIndex: 10 }}
        center={[16.843908, -18.09]}
        zoom={2}
        zoomControl={true}
        scrollWheelZoom={false}
        maxBounds={null}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerCluster>
          {users.map((user) => (
            <div key={user.username}>
              <Marker
                icon={L.icon({
                  className: "rounded-full",
                  iconUrl: `https://github.com/${user.username}.png`,
                  popupAnchor: [0, -10],
                  iconSize: [40, 40],
                  iconAnchor: [20, 20],
                })}
                position={[user.location.lat, user.location.lon]}
              >
                <Popup>
                  <div className="flex flex-col gap-[5px]">
                    <h1 className="font-[600]">
                      <Link
                        href={`https://linkfree.eddiehub.io/${user.username}`}
                      >
                        {user.name}
                      </Link>
                    </h1>
                    <span>{user.location.provided}</span>
                    <span>
                      <ReactMarkdown>{user.bio}</ReactMarkdown>
                    </span>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MarkerCluster>
      </MapContainer>
    </>
  );
}
