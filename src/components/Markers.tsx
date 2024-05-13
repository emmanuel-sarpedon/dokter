"use client";

import { CircleMarker, Marker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { P } from "@/components/Typography.tsx";
import { useUserLocation } from "@/hooks/useUserLocation.ts";
import { Practitioner } from "@prisma/client";
import colors from "tailwindcss/colors";
import { useEffect } from "react";

const Markers = ({
  practitioners,
}: {
  fieldsRecords: Fields;
  practitioners: Partial<Practitioner>[];
}) => {
  const map = useMap();
  const userLocation = useUserLocation();

  useEffect(() => {
    if (userLocation) map.setView(userLocation, 12);
  }, [map, userLocation]);

  return (
    <>
      {practitioners?.map(
        ({ name, profession, address, tel, longitude, latitude }, i) =>
          latitude && longitude ? (
            <CircleMarker
              key={i}
              center={[latitude, longitude]}
              radius={5}
              color={colors.red[500]}
              className={"relative"}
            >
              <Popup>
                <P
                  bold
                  className={"capitalize"}
                >{`DR ${name} - ${profession}`}</P>
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
