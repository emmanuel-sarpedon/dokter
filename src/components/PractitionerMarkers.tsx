"use client";

import {
  Popup,
  Tooltip,
  LayersControl,
  LayerGroup,
  Marker,
} from "react-leaflet";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { P } from "@/components/Typography.tsx";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Fragment, useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import { getEmoji } from "@/lib/getEmoji.ts";
import L from "leaflet";

const PractitionerMarkers = () => {
  const {
    practitioners,
    fields,
    setPractitionerProfessionFilter,
    practitionerProfessionFilter,
  } = useContext(MapContext);
  const { professions } = fields;

  return (
    <Fragment>
      <LayersControl>
        {professions.map((p) => {
          return (
            <LayersControl.Overlay
              name={`${p.libelle} ${getEmoji(p.libelle)}`}
              key={p.id}
              checked={practitionerProfessionFilter.includes(p.libelle)}
            >
              <LayerGroup
                eventHandlers={{
                  add: () =>
                    setPractitionerProfessionFilter((prev) => {
                      if (!prev.includes(p.libelle))
                        return [...prev, p.libelle];

                      return prev;
                    }),

                  remove: () =>
                    setPractitionerProfessionFilter((prev) =>
                      prev.filter((prof) => prof !== p.libelle),
                    ),
                }}
              />
            </LayersControl.Overlay>
          );
        })}

        <MarkerClusterGroup chunkedLoading>
          {practitioners?.map(
            ({ id, name, profession, address, tel, longitude, latitude }) =>
              latitude && longitude ? (
                <Marker
                  key={id}
                  position={[latitude, longitude]}
                  icon={L.icon({
                    iconUrl: "/user-doctor.svg",
                    iconSize: [30, 30],
                  })}
                >
                  <Tooltip
                    className={"font-bold"}
                    permanent
                    direction={"bottom"}
                    offset={[0, 20]}
                  >{`${getEmoji(profession)} ${profession} `}</Tooltip>

                  <Popup>
                    <P
                      bold
                      className={"capitalize"}
                    >{`DR ${name}, ${getEmoji(profession)} ${profession} `}</P>
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
                </Marker>
              ) : // </CircleMarker>
              null,
          )}
        </MarkerClusterGroup>
      </LayersControl>
    </Fragment>
  );
};

export default PractitionerMarkers;
