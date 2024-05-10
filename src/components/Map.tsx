"use client";

import {
  MapContainer,
  Marker,
  CircleMarker,
  TileLayer,
  useMap,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";

export default function Map() {
  return (
    <MapContainer
      center={[-21.114533, 55.532062]} // default position to Reunion Island
      zoom={12}
      scrollWheelZoom={true}
      className={"w-full h-full"}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Markers />
    </MapContainer>
  );
}

const Markers = () => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ name: string; pos: LatLngTuple }[]>(
    [],
  );

  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 13); // zoom to user location
      setUserLocation([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    fetch("/api/practitioners")
      .then((res) => res.json())
      .then(({ practitioners }) => {
        setMarkers(
          practitioners.map(
            (p: {
              latitude: number;
              longitude: number;
              name: string;
              address: string;
            }) => ({
              pos: [p.latitude, p.longitude],
              name: p.name + " " + p.address,
            }),
          ),
        );
      });
  }, []);

  return (
    <>
      {markers.map(({ name, pos }, i) => (
        <CircleMarker key={i} center={pos} radius={8}>
          <Popup>{name}</Popup>
        </CircleMarker>
      ))}

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>{"Vous êtes ici"}</Popup>
        </Marker>
      )}
    </>
  );
};

const RecenterAutomatically = ({ tuple }: { tuple: LatLngTuple }) => {
  const map = useMap();
  const [lat, lng] = tuple;

  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng]);

  return null;
};
