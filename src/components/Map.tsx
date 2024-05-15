"use client";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import {useContext} from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import ActionButtons from "@/components/ActionButtons.tsx";
import SearchEngine from "@/components/SearchEngine.tsx";
import Results from "@/components/Results.tsx";
import Markers from "@/components/Markers.tsx";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map() {
  const { isSatelliteMode, userLocation } = useContext(MapContext);

  return (
    <MapContainer
      zoomControl={false}
      center={userLocation || [-20.890314391551765, 55.51186605492485]} // default position on Reunion Island
      zoom={14}
      minZoom={11}
      scrollWheelZoom={true}
      className={"w-full h-full"}
    >
      <TileLayer
        url={
          isSatelliteMode
            ? "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
            : "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        }
      />

      <ZoomControl position="bottomleft" />

      <ActionButtons />
      <Markers />
      <SearchEngine />
      <Results />
    </MapContainer>
  );
}
