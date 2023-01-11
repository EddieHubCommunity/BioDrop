import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// note to other devs - this default marker from the leaflet docs won't
// render without additional packages but we won't need them later so not 
// adding them. it will appear as a broken image on the map for now

export default function Map(){
    return(
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
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    );
}