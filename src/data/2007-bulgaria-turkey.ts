import type { Trip } from "./types";

const trip: Trip = {
  slug: "2007-bulgaria-turkey",
  title: "Bulgaria & Turkey",
  year: 2007,
  // Balkans to Bosphorus
  bounds: [
    [20.0, 40.0],
    [32.0, 44.5],
  ],
  stops: [
    {
      name: "Sofia",
      country: "Bulgaria",
      coords: [23.32, 42.70],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      name: "Istanbul",
      country: "Turkey",
      coords: [28.98, 41.01],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Sofia",
      mode: "flight",
      date: "2007",
    },
    {
      number: 2,
      from: "Sofia",
      to: "Istanbul",
      mode: "bus",
      date: "2007",
    },
  ],
};

export default trip;
