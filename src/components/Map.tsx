"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Markers from "@/components/Markers.tsx";
import { PropsWithChildren } from "react";

export default function Map({ children }: PropsWithChildren) {
  return (
    <MapContainer
      center={[-21.114533, 55.532062]} // default position to Reunion Island
      zoom={12}
      scrollWheelZoom={true}
      className={"w-full h-full"}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Markers />

      {children}
    </MapContainer>
  );
}
