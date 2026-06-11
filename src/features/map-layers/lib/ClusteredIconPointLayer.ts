import {
  CompositeLayer,
  type CompositeLayerProps,
  type GetPickingInfoParams,
  type Layer,
  type PickingInfo,
  type UpdateParameters,
} from "@deck.gl/core";
import { IconLayer, type IconLayerProps } from "@deck.gl/layers";
import Supercluster from "supercluster";
import type {
  ClusterMapFeature,
  ClusterMapProperties,
  MapPointFeature,
  MapPointProperties,
} from "../types";

type IconMapping = IconLayerProps<unknown>["iconMapping"];

export type ClusteredIconPointLayerProps<T> = {
  data: readonly T[];
  visible?: boolean;
  enableClustering?: boolean;
  clusterRadius?: number;
  maxZoom?: number;
  iconAtlas: string;
  iconMapping: IconMapping;
  pointIconId: string;
  clusterIconId: string;
  pointSize?: number;
  clusterSize?: number;
  getCoordinates: (item: T) => [number, number];
} & CompositeLayerProps;

type ClusteredLayerState<T> = {
  index?: Supercluster<MapPointProperties<T>, ClusterMapProperties>;
  clusters: ClusterMapFeature[];
  points: MapPointFeature<T>[];
  z?: number;
};

const DEFAULT_CLUSTER_RADIUS = 40;
const DEFAULT_MAX_ZOOM = 16;
const WORLD_BOUNDS: [number, number, number, number] = [-180, -85, 180, 85];

export class ClusteredIconPointLayer<
  T extends { id: string },
> extends CompositeLayer<Required<ClusteredIconPointLayerProps<T>>> {
  static override readonly layerName = "ClusteredIconPointLayer";

  static override readonly defaultProps = {
    visible: true,
    pickable: true,
    enableClustering: false,
    clusterRadius: DEFAULT_CLUSTER_RADIUS,
    maxZoom: DEFAULT_MAX_ZOOM,
    pointSize: 32,
    clusterSize: 48,
    onClick: { type: "function", compare: false, optional: true },
  };

  override initializeState(): void {
    this.setState({
      clusters: [],
      points: [],
    });
  }

  override shouldUpdateState(
    params: UpdateParameters<Layer<Required<ClusteredIconPointLayerProps<T>>>>
  ): boolean {
    return params.changeFlags.somethingChanged;
  }

  override getPickingInfo({ info, mode }: GetPickingInfoParams): PickingInfo {
    if (mode === "hover" || !info.object) {
      return info;
    }

    const properties = this.getFeatureProperties(info.object);
    if (!properties) {
      return info;
    }

    if (properties.cluster) {
      const index = (this.state as ClusteredLayerState<T>).index;
      if (!index) {
        return info;
      }

      const items = index
        .getLeaves(properties.cluster_id, Number.POSITIVE_INFINITY)
        .map((leaf: MapPointFeature<T>) => leaf.properties.item)
        .filter((item: T | undefined): item is T => item != null);

      return { ...info, object: items };
    }

    if ("item" in properties && properties.item) {
      return { ...info, object: properties.item };
    }

    return info;
  }

  override updateState(
    params: UpdateParameters<Layer<Required<ClusteredIconPointLayerProps<T>>>>
  ): void {
    const { changeFlags, props, oldProps } = params;

    const rebuildIndex =
      changeFlags.dataChanged ||
      props.enableClustering !== oldProps.enableClustering ||
      props.clusterRadius !== oldProps.clusterRadius ||
      props.maxZoom !== oldProps.maxZoom;

    if (rebuildIndex) {
      if (props.enableClustering && props.data.length > 0) {
        const index = new Supercluster<
          MapPointProperties<T>,
          ClusterMapProperties
        >({
          radius: props.clusterRadius ?? DEFAULT_CLUSTER_RADIUS,
          maxZoom: props.maxZoom ?? DEFAULT_MAX_ZOOM,
        });

        index.load(this.toFeatures(props.data));

        this.setState({
          index,
          clusters: [],
          points: [],
        });
      } else {
        this.setState({
          index: undefined,
          clusters: [],
          points: this.toFeatures(props.data),
          z: undefined,
        });
      }
    }

    const state = this.state as ClusteredLayerState<T>;
    if (!props.enableClustering || !state.index) {
      return;
    }

    const z = Math.floor(this.context.viewport.zoom ?? 0);
    if (!rebuildIndex && !changeFlags.viewportChanged && z === state.z) {
      return;
    }

    const features = state.index.getClusters(WORLD_BOUNDS, z);
    const clusters: ClusterMapFeature[] = [];
    const points: MapPointFeature<T>[] = [];

    for (const feature of features) {
      if (feature.properties.cluster) {
        clusters.push(feature as ClusterMapFeature);
        continue;
      }

      points.push(feature as MapPointFeature<T>);
    }

    this.setState({
      clusters,
      points,
      z,
    });
  }

  override renderLayers() {
    const state = this.state as ClusteredLayerState<T>;
    const {
      visible,
      iconAtlas,
      iconMapping,
      pointIconId,
      clusterIconId,
      pointSize,
      clusterSize,
      onClick,
    } = this.props;

    const handleClick = onClick
      ? (
          info: PickingInfo,
          event: Parameters<NonNullable<typeof onClick>>[1]
        ) => {
          onClick(
            this.getPickingInfo({
              info,
              mode: "pick",
              sourceLayer: info.sourceLayer ?? null,
            }),
            event
          );
        }
      : undefined;

    return [
      new IconLayer<ClusterMapFeature>(
        this.getSubLayerProps({
          id: "clusters",
          data: state.clusters,
          visible: visible && state.clusters.length > 0,
          pickable: true,
          iconAtlas,
          iconMapping,
          getIcon: () => clusterIconId,
          getPosition: (feature: ClusterMapFeature) =>
            feature.geometry.coordinates as [number, number],
          sizeScale: clusterSize,
          onClick: handleClick,
        })
      ),
      new IconLayer<MapPointFeature<T>>(
        this.getSubLayerProps({
          id: "points",
          data: state.points,
          visible: visible && state.points.length > 0,
          pickable: true,
          iconAtlas,
          iconMapping,
          getIcon: () => pointIconId,
          getPosition: (feature: MapPointFeature<T>) =>
            feature.geometry.coordinates as [number, number],
          sizeScale: pointSize,
          onClick: handleClick,
        })
      ),
    ];
  }

  private getFeatureProperties(
    object: unknown
  ): ClusterMapProperties | MapPointProperties<T> | null {
    if (typeof object !== "object" || object == null) {
      return null;
    }

    if ("properties" in object && object.properties) {
      return object.properties as ClusterMapProperties | MapPointProperties<T>;
    }

    if ("cluster" in object || "item" in object) {
      return object as ClusterMapProperties | MapPointProperties<T>;
    }

    return null;
  }

  private toFeatures(data: readonly T[]): MapPointFeature<T>[] {
    return data.map((item) => ({
      type: "Feature" as const,
      properties: { cluster: false as const, item },
      geometry: {
        type: "Point" as const,
        coordinates: this.props.getCoordinates(item),
      },
    }));
  }
}
