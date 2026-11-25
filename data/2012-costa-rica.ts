import type { Trip } from "./types";

const trip: Trip = {
  slug: "2012-costa-rica",
  title: "Costa Rica",
  year: 2012,
  // Northwest Costa Rica — Guanacaste / Arenal region
  bounds: [
    [-86.5, 9.0],
    [-82.5, 11.5],
  ],
  stops: [
    {
      name: "Tamarindo",
      country: "Costa Rica",
      coords: [-85.84, 10.30],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      // Cloud forest reserve
      name: "Monteverde",
      country: "Costa Rica",
      coords: [-84.83, 10.32],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      // Arenal Volcano area
      name: "La Fortuna",
      country: "Costa Rica",
      coords: [-84.64, 10.47],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Tamarindo",
      mode: "flight",
      date: "2012",
    },
    {
      number: 2,
      from: "Tamarindo",
      to: "Monteverde",
      mode: "bus",
      date: "2012",
    },
    {
      number: 3,
      from: "Monteverde",
      to: "La Fortuna",
      mode: "bus",
      date: "2012",
    },
  ],
};

export default trip;
