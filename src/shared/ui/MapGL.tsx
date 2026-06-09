import type { DeckProps, MapViewState } from "@deck.gl/core";
import { DeckGL, type DeckGLRef } from "@deck.gl/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { memo, type Ref } from "react";
import ReactMap from "react-map-gl/maplibre";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
};

const CONTROLS: DeckProps["controller"] = {
  doubleClickZoom: false,
  scrollZoom: { speed: 0.5, smooth: true },
  inertia: 300,
  touchZoom: true,
};

interface Props extends Omit<DeckProps, "height" | "width"> {
  ref?: Ref<DeckGLRef>;
}

export const MapGL = memo(function MapGL(props: Props) {
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={CONTROLS}
      {...props}
    >
      <ReactMap
        mapLib={maplibregl}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
    </DeckGL>
  );
});
