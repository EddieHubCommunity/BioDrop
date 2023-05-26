import L from "leaflet";
import { createPathComponent } from "@react-leaflet/core";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";

function createMarkerCluster({ children: _c, ...props }, context) {
  const clusterProps = {chunkedLoading: true};
  const clusterEvents = {};

  Object.entries(props).forEach(([propName, prop]) =>
    propName.startsWith("on")
      ? (clusterEvents[propName] = prop)
      : (clusterProps[propName] = prop)
  );
  const instance = new L.MarkerClusterGroup(clusterProps);

  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    instance.on(clusterEvent, callback);
  });
  return {
    instance,
    context: {
      ...context,
      layerContainer: instance,
    },
  };
}

const MarkerCluster = createPathComponent(createMarkerCluster);

export default MarkerCluster;
