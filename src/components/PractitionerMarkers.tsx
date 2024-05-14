"use client";

import { CircleMarker, Popup } from "react-leaflet";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { P } from "@/components/Typography.tsx";
import { Practitioner } from "@prisma/client";
import colors from "tailwindcss/colors";
import MarkerClusterGroup from "react-leaflet-cluster";

const PractitionerMarkers = ({
  practitioners,
}: {
  practitioners: Partial<Practitioner>[];
}) => {
  return (
    <MarkerClusterGroup chunkedLoading>
      {practitioners?.map(
        ({ id, name, profession, address, tel, longitude, latitude }) =>
          latitude && longitude ? (
            <CircleMarker
              key={id}
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

export default PractitionerMarkers;
