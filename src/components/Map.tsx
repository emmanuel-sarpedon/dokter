"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import PractitionerMarkers from "@/components/PractitionerMarkers.tsx";
import SearchEngine from "@/components/SearchEngine.tsx";
import { usePractitioners } from "@/hooks/usePractitioners.ts";
import { useFields } from "@/hooks/useFields.ts";
import Results from "@/components/Results.tsx";
import { useEffect, useState } from "react";
import ActionButtons from "@/components/ActionButtons.tsx";
import useEstablishments from "@/hooks/useEstablishments.ts";
import EstablishementMarkers from "@/components/EstablishementMarkers.tsx";

export default function Map() {
  const [isMenuOpened, setIsMenuOpened] = useState(true);
  const [isFiltersSheetOpened, setIsFiltersSheetOpened] = useState(true);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isSatelliteMode, setIsSatelliteMode] = useState(false);

  const [tabActive, setTabActive] = useState<"practitioner" | "establishment">(
    "practitioner",
  );

  const { isFetchingPractitioner, practitioners, handleFetchPractitioners } =
    usePractitioners();

  const {
    isFetchingEstablishments,
    establishments,
    handleFetchEstablishments,
  } = useEstablishments();

  const fields = useFields();

  useEffect(() => {
    if (isResultsOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isResultsOpen]);

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

      <ActionButtons
        tabActive={tabActive}
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
        isSatelliteMode={isSatelliteMode}
        setIsSatelliteMode={setIsSatelliteMode}
        setIsFiltersSheetOpened={setIsFiltersSheetOpened}
        setIsResultsOpen={setIsResultsOpen}
        practitioners={practitioners}
        establishments={establishments}
      />

      {tabActive === "practitioner" ? (
        <PractitionerMarkers practitioners={practitioners} />
      ) : (
        <EstablishementMarkers establishments={establishments} />
      )}

      <SearchEngine
        isOpened={isFiltersSheetOpened}
        setIsOpened={setIsFiltersSheetOpened}
        tabActive={tabActive}
        setTabActive={setTabActive}
        setIsMenuOpened={setIsMenuOpened}
        setIsResultsOpen={setIsResultsOpen}
        fieldsRecords={fields}
        isFetchingPractitioner={isFetchingPractitioner}
        practitioners={practitioners}
        handleFetchPractitioners={handleFetchPractitioners}
        isFetchingEstablishment={isFetchingEstablishments}
        establishments={establishments}
        handleFetchEstablishments={handleFetchEstablishments}
      />

      <Results
        tabActive={tabActive}
        setIsOpen={setIsResultsOpen}
        isOpen={isResultsOpen}
        practitioners={practitioners}
        establishments={establishments}
      />
    </MapContainer>
  );
}
