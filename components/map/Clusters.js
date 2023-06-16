import { useState } from "react";
import { Marker, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import UserMarker from "./UserMarker";
import styles from "./Clusters.module.css";

export default function Clusters({users}) {
  const map = useMap();
  const mapB = map.getBounds();
  const [bounds, setBounds] = useState([
    mapB.getSouthWest().lng,
    mapB.getSouthWest().lat,
    mapB.getNorthEast().lng,
    mapB.getNorthEast().lat
  ]);
  const [zoom, setZoom] = useState(map.getZoom());

  function updateMap() {
    const b = map.getBounds();
    console.log(b)
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat
    ]);
    setZoom(map.getZoom());
  }

  map.on('moveend', function() {
    updateMap();
  })

  const { clusters, supercluster } = useSupercluster({
    points: users,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  const icons = {};
  const fetchIcon = (count, size) => {
    if (!icons[count]) {
      icons[count] = L.divIcon({
        html: `<div class="${styles.clusterMarker}" style="width: ${size}px; height: ${size}px;">
          ${count}
        </div>`,
        className: styles.marker
      });
    }
    return icons[count];
  };

  return (
    <>
      {clusters.map(cluster => {
          // every cluster point has coordinates
          const [longitude, latitude] = cluster.geometry.coordinates;
          // the point may be either a cluster or a crime point
          const {
            cluster: isCluster,
            point_count: pointCount,
            username
          } = cluster.properties;

          // we have a cluster to render
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                position={[latitude, longitude]}
                icon={fetchIcon(
                  pointCount,
                  10 + (pointCount / users.length) * 40
                )}
                eventHandlers={{
                  click: () => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      17
                    );
                    map.setView([cluster.geometry.coordinates[1], cluster.geometry.coordinates[0]], expansionZoom, {
                      animate: true
                    });
                  }
                }}
                style={{background: 'none !important', border: 'none !important'}}
              />
            );
          }

          // we have a single point to render
          return (
            <UserMarker user={cluster} key={username} />
          );
        })}
    </>
  )
}