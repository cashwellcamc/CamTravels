import type { Trip } from "./types";

const trip: Trip = {
  slug: "2025-chicago-montreal-quebec",
  title: "Chicago & Québec",
  year: 2025,
  // Great Lakes to St. Lawrence
  bounds: [
    [-91.0, 41.0],
    [-69.0, 48.0],
  ],
  stops: [
    {
      name: "Chicago",
      country: "United States",
      coords: [-87.63, 41.88],
      labelOffset: [-10, 8],
      labelAnchor: "end",
    },
    {
      name: "Montréal",
      country: "Canada",
      coords: [-73.57, 45.51],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
    {
      name: "Québec City",
      country: "Canada",
      coords: [-71.21, 46.81],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Chicago",
      mode: "flight",
      date: "2025",
    },
    {
      number: 2,
      from: "Chicago",
      to: "Montréal",
      mode: "flight",
      date: "2025",
    },
    {
      number: 3,
      from: "Montréal",
      to: "Québec City",
      mode: "bus",
      date: "2025",
    },
    {
      number: 4,
      from: "Québec City",
      to: "Montréal",
      mode: "bus",
      date: "2025",
    },
  ],
};

export default trip;
