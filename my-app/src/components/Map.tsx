'use client'

import ReactMapGL, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { useSpringContext } from "@/src/contexts/SpringContext";
import styles from "./Map.module.css";

interface MapComponentProps {
  setMapInstance?: (instance: any) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  setMapInstance,
}) => {
  const router = useRouter();
  const {
    filteredSprings,
    hoveredId,
    activeId,
    setHoveredId,
    setActiveId,
  } = useSpringContext();

  const handleMapLoad = (e: any) => {
    setMapInstance?.(e.target);
  };

  const handleMarkerClick = (slug: string, id: string) => {
    setActiveId(id);
    router.push(`/springs/${slug}`);
  };

  return (
    <ReactMapGL
      id="myMap"
      mapboxAccessToken="pk.eyJ1IjoibGVvbi1oYW0iLCJhIjoiY2x6dmhkaTQ0MDcyZDJxc2R6dWx2eGJsYSJ9.yIlmFp0nhGD7aygFZQzFHg"
      initialViewState={{
        longitude: 21.8243,
        latitude: 39.0742,
        zoom: 6,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/leon-ham/cm73r9sso01s901s22sv9hnlm"
      onLoad={handleMapLoad}
    >
      {filteredSprings
        .filter(spring => spring.location?.lng && spring.location?.lat)
        .map((spring) => {
          const isHovered = hoveredId === spring._id;
          const isActive = activeId === spring._id;

          const className = [
            styles.marker,
            isHovered && styles['marker--hovered'],
            isActive && styles['marker--active']
          ].filter(Boolean).join(' ');

          return (
            <Marker
              key={spring._id}
              longitude={spring.location.lng}
              latitude={spring.location.lat}
            >
              <div
                className={className}
                onClick={() => handleMarkerClick(spring.slug, spring._id)}
                onMouseEnter={() => setHoveredId(spring._id)}
                onMouseLeave={() => setHoveredId(null)}
                title={spring.name}
              />
            </Marker>
          );
        })}
    </ReactMapGL>
  );
};

export default MapComponent;