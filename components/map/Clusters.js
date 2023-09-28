import { useState } from "react";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import UserMarker from "./UserMarker";
import styles from "./Clusters.module.css";

export default function Clusters({ users }) {
  const map = useMap();
  const mapB = map.getBounds();
  const [bounds, setBounds] = useState([
    mapB.getSouthWest().lng,
    mapB.getSouthWest().lat,
    mapB.getNorthEast().lng,
    mapB.getNorthEast().lat,
  ]);
  const [zoom, setZoom] = useState(map.getZoom());

  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  map.on("moveend", function () {
    updateMap();
  });

  const { clusters, supercluster } = useSupercluster({
    points: users,
    bounds,
    zoom,
    options: {
      radius: zoom < 17 ? 75 : 50,
      maxZoom: 18,
    },
  });

  const icons = {};
  const fetchIcon = (count) => {
    const size = count < 25 ? "small" : count < 100 ? "medium" : "large";
    if (!icons[count]) {
      icons[count] = L.divIcon({
        html: `<div><span>${count}</span></div>`,
        className: `${styles["marker-cluster"]} ${styles[size]}`,
        iconSize: L.point(40, 40),
      });
    }
    return icons[count];
  };

  return (
    <>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or user
        const {
          cluster: isCluster,
          point_count: pointCount,
          username,
        } = cluster.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(pointCount)}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    18,
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        // we have a single point to render
        return <UserMarker user={cluster} key={username} />;
      })}
    </>
  );
}
