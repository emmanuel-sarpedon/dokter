"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import ActionButtons from "@/components/ActionButtons.tsx";
import PractitionerMarkers from "@/components/PractitionerMarkers.tsx";
import SearchEngine from "@/components/SearchEngine.tsx";
import EstablishmentMarkers from "@/components/EstablishmentMarkers.tsx";
import Results from "@/components/Results.tsx";

export default function Map() {
  const { isSatelliteMode, tabActive } = useContext(MapContext);

  return (
    <MapContainer
      zoomControl={false}
      center={[-20.890314391551765, 55.51186605492485]} // default position on Reunion Island
      zoom={14}
      zoomDelta={0.25}
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

      <ActionButtons />

      {tabActive === "practitioner" ? (
        <PractitionerMarkers />
      ) : (
        <EstablishmentMarkers />
      )}

      <SearchEngine />
      <Results />
    </MapContainer>
  );
}
