import { MapContainer, TileLayer } from "react-leaflet";
import Clusters from "./Clusters";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useMemo} from "react";

export default function Map({ users }) {
  const boundsMap = [
    [-90, -180], // Southwest coordinates
    [90, 180], // Northeast coordinates
  ];
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const height = useMemo(() => (width > 1000 ? "100vh" : "40vh"), [width]);


  return (
    <div style={{height}}>
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={2}
      zoomControl={true}
      scrollWheelZoom={true}
      maxBounds={boundsMap}
      maxBoundsViscosity={0.7}
      style={{height:'100%'}}
    >
    
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Clusters users={users} />
    </MapContainer>
    </div>
  );
}
