import type { Trip } from "./types";

const trip: Trip = {
  slug: "2017-nicaragua",
  title: "Nicaragua",
  year: 2017,
  // Southwest Nicaragua / Pacific coast
  bounds: [
    [-87.5, 10.0],
    [-83.5, 14.0],
  ],
  stops: [
    {
      name: "San Juan del Sur",
      country: "Nicaragua",
      coords: [-85.87, 11.25],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "San Juan del Sur",
      mode: "flight",
      date: "2017",
    },
  ],
};

export default trip;
