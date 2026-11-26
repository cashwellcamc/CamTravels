import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Polyline from "@arcgis/core/geometry/Polyline";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Extent from "@arcgis/core/geometry/Extent";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Trip, Leg, Stop, TransportMode } from "../data/types";

const SR = { wkid: 4326 };

const MODE_COLOR: Record<TransportMode, string> = {
  flight: "#D85A30",
  bus:    "#1D9E75",
  train:  "#1D9E75",
  ferry:  "#1D9E75",
  car:    "#6366F1",
};
const UPCOMING_COLOR = "#888780";

// Known home-city coordinates for origin/return legs not in stops
const HOME_CITIES: Record<string, [number, number]> = {
  "Washington DC":    [-77.04, 38.91],
  "Washington, DC":   [-77.04, 38.91],
  "New York":         [-74.00, 40.71],
  "Chicago":          [-87.63, 41.88],
  "Los Angeles":      [-118.25, 34.05],
};

function getLegColor(leg: Leg): string {
  return leg.upcoming ? UPCOMING_COLOR : MODE_COLOR[leg.mode];
}

function getCoords(name: string, stops: Stop[]): [number, number] | null {
  const stop = stops.find((s) => s.name === name);
  if (stop) return stop.coords;
  return HOME_CITIES[name] ?? null;
}

// Great-circle interpolation between two [lon, lat] points
function gcPoints(from: [number, number], to: [number, number], n = 60): [number, number][] {
  const r = (d: number) => (d * Math.PI) / 180;
  const d2 = (rad: number) => (rad * 180) / Math.PI;
  const φ1 = r(from[1]), λ1 = r(from[0]);
  const φ2 = r(to[1]),   λ2 = r(to[0]);
  const dist = 2 * Math.asin(
    Math.sqrt(
      Math.sin((φ2 - φ1) / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2
    )
  );
  if (dist < 0.001) return [from, to];
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const A = Math.sin((1 - f) * dist) / Math.sin(dist);
    const B = Math.sin(f * dist) / Math.sin(dist);
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);
    pts.push([d2(Math.atan2(y, x)), d2(Math.atan2(z, Math.sqrt(x * x + y * y)))]);
  }
  return pts;
}

function modeLabel(mode: TransportMode): string {
  const labels: Record<TransportMode, string> = {
    flight: "Flight",
    bus:    "Bus",
    train:  "Train",
    ferry:  "Ferry",
    car:    "Car",
  };
  return labels[mode];
}

function buildTripGraphics(trip: Trip): Graphic[] {
  const graphics: Graphic[] = [];

  // ── Legs ──────────────────────────────────────────────────────────────────
  trip.legs.forEach((leg) => {
    const from = getCoords(leg.from, trip.stops);
    const to   = getCoords(leg.to,   trip.stops);
    if (!from || !to) return;

    const color = getLegColor(leg);
    const pts   = leg.mode === "flight" ? gcPoints(from, to) : [from, to];

    // Line style: upcoming = dash, flight = short-dash, land = solid
    const style: __esri.SimpleLineSymbolProperties["style"] =
      leg.upcoming ? "dash" : leg.mode === "flight" ? "short-dash" : "solid";

    graphics.push(
      new Graphic({
        geometry: new Polyline({ paths: [pts as number[][]], spatialReference: SR }),
        symbol: new SimpleLineSymbol({ color, width: 2, style }),
      })
    );

    // ── Leg badge (numbered circle) at route midpoint ──────────────────────
    const mid = pts[Math.floor(pts.length / 2)];

    graphics.push(
      new Graphic({
        geometry: new Point({ longitude: mid[0], latitude: mid[1], spatialReference: SR }),
        symbol: new SimpleMarkerSymbol({
          color,
          size: 20,
          style: "circle",
          outline: { color: "#ffffff", width: 1.5 },
        }),
      }),
      new Graphic({
        geometry: new Point({ longitude: mid[0], latitude: mid[1], spatialReference: SR }),
        symbol: new TextSymbol({
          text: String(leg.number),
          color: "#ffffff",
          font: { size: 9, weight: "bold" },
          horizontalAlignment: "center",
          verticalAlignment: "middle",
          yoffset: 0,
        }),
      })
    );

    // ── Mode label near midpoint (offset slightly to avoid badge overlap) ──
    const labelPt = pts[Math.floor(pts.length * 0.65)];
    graphics.push(
      new Graphic({
        geometry: new Point({ longitude: labelPt[0], latitude: labelPt[1], spatialReference: SR }),
        symbol: new TextSymbol({
          text: modeLabel(leg.mode),
          color,
          font: { size: 9, weight: "bold" },
          horizontalAlignment: "left",
          verticalAlignment: "bottom",
          xoffset: 12,
          yoffset: 4,
        }),
      })
    );
  });

  // ── City stops ────────────────────────────────────────────────────────────
  trip.stops.forEach((stop) => {
    const [dx, dy] = stop.labelOffset ?? [8, 4];
    const anchor   = stop.labelAnchor ?? "start";
    const hAlign   = anchor === "end" ? "right" : anchor === "middle" ? "center" : "left";

    // White dot with dark border
    graphics.push(
      new Graphic({
        geometry: new Point({ longitude: stop.coords[0], latitude: stop.coords[1], spatialReference: SR }),
        symbol: new SimpleMarkerSymbol({
          color: "#ffffff",
          size: 8,
          style: "circle",
          outline: { color: "#1a1a1a", width: 1.5 },
        }),
      })
    );

    // City name label (yoffset: positive = up in ESRI screen space → flip SVG dy)
    graphics.push(
      new Graphic({
        geometry: new Point({ longitude: stop.coords[0], latitude: stop.coords[1], spatialReference: SR }),
        symbol: new TextSymbol({
          text: stop.name,
          color: "#1a1a1a",
          font: { size: 11, weight: "bold", family: "sans-serif" },
          horizontalAlignment: hAlign,
          verticalAlignment: "middle",
          xoffset: dx,
          yoffset: -dy,
        }),
      })
    );
  });

  return graphics;
}

function applyTrip(
  view: MapView,
  tripLayer: GraphicsLayer,
  trip: Trip | null
) {
  tripLayer.removeAll();

  if (!trip) {
    view.goTo({ zoom: 2.5, center: [0, 20] }, { duration: 700 });
    return;
  }

  tripLayer.addMany(buildTripGraphics(trip));

  const [[minLon, minLat], [maxLon, maxLat]] = trip.bounds;
  const extent = new Extent({
    xmin: minLon,
    ymin: minLat,
    xmax: maxLon,
    ymax: maxLat,
    spatialReference: SR,
  });
  view.goTo(extent.expand(1.2), { duration: 850, easing: "ease-in-out" });
}

interface Props {
  selectedTrip: Trip | null;
}

export default function EsriMap({ selectedTrip }: Props) {
  const mapDivRef     = useRef<HTMLDivElement>(null);
  const viewRef       = useRef<MapView | null>(null);
  const tripLayerRef  = useRef<GraphicsLayer | null>(null);
  // Track latest trip so view.when() can apply it after map finishes loading
  const pendingTrip   = useRef<Trip | null | undefined>(undefined);

  // ── Initialise map (once) ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapDivRef.current) return;

    const baseLayer = new GraphicsLayer({ id: "countries" });
    const tripLayer = new GraphicsLayer({ id: "trip" });
    tripLayerRef.current = tripLayer;

    const map = new Map({ layers: [baseLayer, tripLayer] });

    const view = new MapView({
      container: mapDivRef.current,
      map,
      zoom: 2.5,
      center: [0, 20],
      constraints: { rotationEnabled: false, minZoom: 1 },
      ui: { components: ["attribution"] },
      popupEnabled: false,
    });
    viewRef.current = view;

    view.when(async () => {
      // Load world country polygons from CDN
      try {
        const topo = (await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
        ).then((r) => r.json())) as Topology;

        const countries = feature(topo, topo.objects.countries as GeometryCollection);

        const landSymbol = new SimpleFillSymbol({
          color: [232, 224, 216, 1],
          outline: { color: [200, 191, 176, 1], width: 0.5 },
        });

        const countryGraphics: Graphic[] = [];
        countries.features.forEach((feat) => {
          if (!feat.geometry) return;
          const g = feat.geometry;
          let rings: number[][][] = [];
          if (g.type === "Polygon") {
            rings = g.coordinates as number[][][];
          } else if (g.type === "MultiPolygon") {
            rings = (g.coordinates as number[][][][]).flat();
          }
          if (rings.length === 0) return;
          countryGraphics.push(
            new Graphic({
              geometry: new Polygon({ rings, spatialReference: SR }),
              symbol: landSymbol,
            })
          );
        });

        baseLayer.addMany(countryGraphics);
      } catch (err) {
        console.error("Failed to load world-atlas countries", err);
      }

      // Apply any trip that was selected before the map finished loading
      if (pendingTrip.current !== undefined) {
        applyTrip(view, tripLayer, pendingTrip.current);
        pendingTrip.current = undefined;
      }
    });

    return () => {
      view.destroy();
      viewRef.current = null;
      tripLayerRef.current = null;
    };
  }, []);

  // ── React to trip selection changes ───────────────────────────────────────
  useEffect(() => {
    const view      = viewRef.current;
    const tripLayer = tripLayerRef.current;

    if (!view || !tripLayer) {
      // Map not ready yet — store for later
      pendingTrip.current = selectedTrip;
      return;
    }

    if (!view.ready) {
      pendingTrip.current = selectedTrip;
      return;
    }

    applyTrip(view, tripLayer, selectedTrip);
  }, [selectedTrip]);

  return <div ref={mapDivRef} className="esri-map-container" />;
}
