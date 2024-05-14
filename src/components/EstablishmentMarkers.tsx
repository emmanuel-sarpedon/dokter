"use client";

import { CircleMarker, Popup } from "react-leaflet";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { P } from "@/components/Typography.tsx";
import colors from "tailwindcss/colors";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContext } from "@/context/MapProvider.tsx";
import { useContext } from "react";

const EstablishmentMarkers = () => {
  const { establishments } = useContext(MapContext);

  return (
    <MarkerClusterGroup chunkedLoading>
      {establishments?.map(
        ({
          id,
          name_long,
          category_libelle,
          address,
          tel,
          longitude,
          latitude,
        }) =>
          latitude && longitude ? (
            <CircleMarker
              key={id}
              center={[latitude, longitude]}
              radius={5}
              color={colors.blue[500]}
              className={"relative"}
            >
              <Popup>
                <P
                  bold
                  className={"capitalize"}
                >{`${name_long} - ${category_libelle}`}</P>
                {address ? <P>{address}</P> : null}
                {tel ? (
                  <Link href={`tel:${tel}`}>
                    <P italic>{tel}</P>
                  </Link>
                ) : null}
                <Link
                  className={"flex items-center p-1"}
                  href={`https://www.google.com/maps/place/${latitude},${longitude}`}
                  target={"_blank"}
                >
                  <ExternalLinkIcon className={"mr-2 h-4 w-4"} />
                  Itinéraire Google Maps
                </Link>
              </Popup>
            </CircleMarker>
          ) : null,
      )}
    </MarkerClusterGroup>
  );
};

export default EstablishmentMarkers;
