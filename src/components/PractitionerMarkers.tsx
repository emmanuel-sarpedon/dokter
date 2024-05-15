"use client";

import {
  CircleMarker,
  Popup,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { P } from "@/components/Typography.tsx";
import colors from "tailwindcss/colors";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Fragment, useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import { getEmoji } from "@/lib/getEmoji.ts";

const PractitionerMarkers = () => {
  const { practitioners, fields, setPractitionerProfessionFilter } =
    useContext(MapContext);
  const { professions } = fields;

  return (
    <Fragment>
      <LayersControl>
        {professions.map((p) => {
          return (
            <LayersControl.Overlay
              name={`${p.libelle} (${practitioners.filter(({ profession }) => profession === p.libelle).length})`}
              key={p.id}
              checked
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
                <CircleMarker
                  key={id}
                  center={[latitude, longitude]}
                  radius={5}
                  color={colors.red[500]}
                  className={"relative"}
                >
                  <Tooltip
                    permanent
                    direction={"top"}
                    offset={[0, -10]}
                  >{`DR ${name}, ${getEmoji(profession)} ${profession} `}</Tooltip>

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
                </CircleMarker>
              ) : null,
          )}
        </MarkerClusterGroup>
      </LayersControl>
    </Fragment>
  );
};

export default PractitionerMarkers;
