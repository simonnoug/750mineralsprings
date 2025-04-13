'use client'

import ReactMapGL, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { Spring } from "@/src/types/spring";

interface MapComponentProps {
    springs: Spring[];
    setMapInstance?: (instance: any) => void;
}
  
const MapComponent: React.FC<MapComponentProps> = ({
  springs,
  setMapInstance,
}) => {
  const router = useRouter();

  const handleMapLoad = (e: any) => {
    console.log("Map loaded:", e.target);
    setMapInstance?.(e.target);
  };

  const handleMarkerClick = (slug: string) => {
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
      mapStyle="mapbox://styles/leon-ham/cm73r9sso01s901s22sv9hnlm" // Ensure this style URL is correct
      onLoad={handleMapLoad}  
    >
      {springs
        .filter(spring => spring.location && spring.location.lng && spring.location.lat)
        .map((spring) => (
          <Marker 
            key={spring._id}
            longitude={spring.location.lng} 
            latitude={spring.location.lat}
            onClick={() => handleMarkerClick(spring.slug)}
          >
            <div 
              style={{ cursor: 'pointer', backgroundColor: 'black', borderRadius: '50%', width: '10px', height: '10px' }}
              title={spring.name}
            >
            </div>
          </Marker>
        ))} 
    </ReactMapGL>
  );
};

export default MapComponent