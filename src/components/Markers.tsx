"use client";

import { CircleMarker, Marker, Popup, useMap } from "react-leaflet";
import { useContext, useEffect } from "react";
import { MapContext } from "@/context/MapContext.ts";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { P } from "@/components/Typography.tsx";

const Markers = () => {
  const map = useMap();
  const { practitioners, userLocation } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    if (!userLocation) return;

    map.setView(userLocation, 13);
  }, [map, userLocation]);

  return (
    <>
      {practitioners?.map(({ name, address, tel, longitude, latitude }, i) =>
        latitude && longitude ? (
          <CircleMarker key={i} center={[latitude, longitude]} radius={8}>
            <Popup>
              <P bold className={"capitalize"}>{`DR ${name}`}</P>
              {address ? <P>{address}</P> : null}
              {tel ? (
                <Link href={`tel:${tel}`}>
                  <P italic>{tel}</P>
                </Link>
              ) : null}
              <Link
                className={"flex items-center p-1"}
                href={
                  userLocation
                    ? `https://www.google.com/maps/dir/${latitude},${longitude}/${userLocation[0]},${userLocation[1]}`
                    : `https://www.google.com/maps/place/${latitude},${longitude}`
                }
                target={"_blank"}
              >
                <ExternalLinkIcon className={"mr-2 h-4 w-4"} />
                Itinéraire Google Maps
              </Link>
            </Popup>
          </CircleMarker>
        ) : null,
      )}

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>{"Vous êtes ici"}</Popup>
        </Marker>
      )}
    </>
  );
};

export default Markers;
