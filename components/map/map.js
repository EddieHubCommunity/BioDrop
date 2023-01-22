import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//TODO: map through users, add marker cluster, fix height for responsive- leaflet requires a height value unless the parent is defined 
export default function Map({ users }) {
  console.log(users);
  return (
    <MapContainer
      style={{ height: "800px", zIndex: 10 }}
      center={[51.505, -0.09]}
      zoom={3}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <div>
          <Marker
            icon={L.icon({
              className: "rounded-full",
              iconUrl: users.avatar,
              popupAnchor: [0, -10],
              iconSize: [40, 40],
              iconAnchor: [20, 20],
            })}
            position={[users.location.lat, users.location.lon]}
          >
            <Popup>
              <div className="flex flex-col gap-[5px]">
                <h1 className="font-[600]">{users.username}</h1>
                <span>Location - {users.location.provided}</span>
                <span>Bio - {users.bio}</span>
              </div>
            </Popup>
          </Marker>
          </div>
    </MapContainer>
  );
}
