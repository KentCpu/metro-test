import type { DeckProps } from "@deck.gl/core";
import { DeckGL, type DeckGLRef } from "@deck.gl/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Ref } from "react";
import ReactMap from "react-map-gl/maplibre";
import styles from "./index.module.css";
import { getCursor } from "./getCursor";

const CONTROLS: DeckProps["controller"] = {
  doubleClickZoom: false,
  scrollZoom: { speed: 0.5, smooth: true },
  inertia: 300,
  touchZoom: true,
};

interface Props extends Omit<DeckProps, "height" | "width"> {
  ref?: Ref<DeckGLRef>;
  cardInfo?: React.ReactNode;
}

export function MapGL(props: Props) {
  return (
    <div className={styles["map-container"]}>
      <DeckGL controller={CONTROLS} getCursor={getCursor} {...props}>
        <ReactMap
          mapLib={maplibregl}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        />
      </DeckGL>
      {props.cardInfo}
    </div>
  );
}
