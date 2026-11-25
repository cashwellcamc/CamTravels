import type { Trip } from "./types";

const trip: Trip = {
  slug: "2018-costa-rica",
  title: "Costa Rica '18",
  year: 2018,
  // Central Costa Rica to Pacific coast
  bounds: [
    [-85.5, 9.0],
    [-83.0, 11.0],
  ],
  stops: [
    {
      name: "San José",
      country: "Costa Rica",
      coords: [-84.09, 9.93],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      // Pacific coast beach town
      name: "Jacó",
      country: "Costa Rica",
      coords: [-84.63, 9.62],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "San José",
      mode: "flight",
      date: "2018",
    },
    {
      number: 2,
      from: "San José",
      to: "Jacó",
      mode: "bus",
      date: "2018",
    },
  ],
};

export default trip;
