"use client";

import {
  CircleMarker,
  LayerGroup,
  LayersControl,
  Popup,
  Tooltip,
} from "react-leaflet";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { P } from "@/components/Typography.tsx";
import colors from "tailwindcss/colors";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContext } from "@/context/MapProvider.tsx";
import { Fragment, useContext } from "react";
import { getEmoji } from "@/lib/getEmoji.ts";

const EstablishmentMarkers = () => {
  const { establishments, fields, setEstablishmentCategoryFilter } =
    useContext(MapContext);
  const { categories } = fields;

  return (
    <Fragment>
      <LayersControl>
        {categories.map((c) => {
          return (
            <LayersControl.Overlay
              name={`${c.libelle}`}
              key={c.id}
              checked
            >
              <LayerGroup
                eventHandlers={{
                  add: () =>
                    setEstablishmentCategoryFilter((prev) => {
                      if (!prev.includes(c.libelle))
                        return [...prev, c.libelle];

                      return prev;
                    }),

                  remove: () =>
                    setEstablishmentCategoryFilter((prev) =>
                      prev.filter((cat) => cat !== c.libelle),
                    ),
                }}
              />
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>

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
                <Tooltip
                  permanent
                  direction={"top"}
                  offset={[0, -10]}
                >{`${name_long}`}</Tooltip>

                <Popup>
                  <P
                    bold
                    className={"capitalize"}
                  >{`${name_long}, ${category_libelle}`}</P>
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
    </Fragment>
  );
};

export default EstablishmentMarkers;
