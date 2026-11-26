export type TransportMode = "flight" | "bus" | "train" | "ferry" | "car";

export interface Stop {
  name: string;
  country: string;
  coords: [number, number]; // [lon, lat]
  labelOffset?: [number, number]; // [dx, dy] from dot center
  labelAnchor?: "start" | "end" | "middle";
}

export interface Leg {
  number: number;
  from: string; // matches Stop.name or "Washington DC" for origin
  to: string;
  mode: TransportMode;
  date: string; // "Month DD" display string
  carrier?: string;
  approx?: boolean;
  upcoming?: boolean;
}

export interface Trip {
  slug: string;
  title: string;
  year: number;
  bounds: [[number, number], [number, number]]; // [[minLon, minLat], [maxLon, maxLat]]
  stops: Stop[];
  legs: Leg[];
  mapWidth?: number;  // override default 430 — use wider values for landscape routes
  mapHeight?: number; // override default 640
}
