/* eslint-disable */
'use client'

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactMapGL, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { useSpringContext } from "@/src/contexts/SpringContext";
import styles from "./Map.module.css";

interface MapComponentProps {
  setMapInstance?: (instance: any) => void;
}

const MapComponent = forwardRef<any, MapComponentProps>(({ setMapInstance }, ref) => {
  const internalMapRef = useRef<any>(null);
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

  useImperativeHandle(ref, () => ({
    zoomTo: (lng: number, lat: number, zoom = 12) => {
      internalMapRef.current?.easeTo({
        center: [lng, lat],
        zoom,
        duration: 1000,      // half-second snap
        easing: t => t,
      });
    }
  }));

  const handleMarkerClick = (slug: string, id: string) => {
    setActiveId(id);
    router.push(`/springs/${slug}`);
  };

  return (
    <ReactMapGL
      id="myMap"
      mapboxAccessToken="pk.eyJ1IjoibGVvbi1oYW0iLCJhIjoiY2x6dmhkaTQ0MDcyZDJxc2R6dWx2eGJsYSJ9.yIlmFp0nhGD7aygFZQzFHg"
      initialViewState={{
        longitude: 23.803,
        latitude: 38.250,
        zoom: 5.7,
      }}
      style={{ width: '100%', height: 'var(--body-height)' }}
      mapStyle="mapbox://styles/leon-ham/cm73r9sso01s901s22sv9hnlm"
      onLoad={handleMapLoad}
      ref={internalMapRef}
      attributionControl={false}
      logoPosition="bottom-right"
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
});

export default MapComponent;