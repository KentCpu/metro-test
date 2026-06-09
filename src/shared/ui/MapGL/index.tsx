import type { DeckProps, MapViewState } from "@deck.gl/core";
import { DeckGL, type DeckGLRef } from "@deck.gl/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { memo, type Ref } from "react";
import ReactMap from "react-map-gl/maplibre";
import styles from "./index.module.css";
import { CloseButton, FloatingWindow } from "@mantine/core";
import { getCursor } from "./getCursor";
import { useDisclosure } from "@mantine/hooks";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 37.6176,
  latitude: 55.7558,
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
  cardInfo?: React.ReactNode;
}

export const MapGL = memo(function MapGL(props: Props) {
  return (
    <div className={styles["map-container"]}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={CONTROLS}
        getCursor={getCursor}
        {...props}
      >
        <ReactMap
          mapLib={maplibregl}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        />
      </DeckGL>
      <CardInfo>{props.cardInfo}</CardInfo>
    </div>
  );
});

function CardInfo({ children }: { children: React.ReactNode | null }) {
  const [visible, handlers] = useDisclosure(true);

  if (!visible || !children) {
    return null;
  }

  return (
    <FloatingWindow
      p="sm"
      w={280}
      withBorder
      pos="absolute"
      constrainToViewport
      constrainOffset={20}
      initialPosition={{ top: 50, right: 20 }}
    >
      <CloseButton onClick={handlers.close} />
      {children}
    </FloatingWindow>
  );
}
