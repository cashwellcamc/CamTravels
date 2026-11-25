import type { Trip } from "./types";

const trip: Trip = {
  slug: "2023-oahu",
  title: "Oahu",
  year: 2023,
  // Full island of Oahu with surrounding Pacific
  bounds: [
    [-158.6, 21.0],
    [-157.4, 22.0],
  ],
  stops: [
    {
      name: "Waikiki",
      country: "Hawaii",
      coords: [-157.83, 21.28],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
    {
      name: "Hale'iwa",
      country: "Hawaii",
      coords: [-158.10, 21.59],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      name: "Waimea Bay",
      country: "Hawaii",
      coords: [-158.07, 21.64],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      // East side — Kailua / Windward Coast beaches
      name: "Kailua",
      country: "Hawaii",
      coords: [-157.74, 21.40],
      labelOffset: [10, 0],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Waikiki",
      mode: "flight",
      date: "2023",
    },
    {
      number: 2,
      from: "Waikiki",
      to: "Hale'iwa",
      mode: "car",
      date: "2023",
    },
    {
      number: 3,
      from: "Hale'iwa",
      to: "Waimea Bay",
      mode: "car",
      date: "2023",
    },
    {
      number: 4,
      from: "Waimea Bay",
      to: "Kailua",
      mode: "car",
      date: "2023",
    },
  ],
};

export default trip;
