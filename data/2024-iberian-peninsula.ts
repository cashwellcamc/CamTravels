import type { Trip } from "./types";

const trip: Trip = {
  slug: "2024-iberian-peninsula",
  title: "Iberian Peninsula",
  year: 2024,
  // Bounds fill the portrait viewport with the full peninsula for context
  bounds: [
    [-10.5, 35.5],
    [4.5, 44.5],
  ],
  stops: [
    {
      name: "Barcelona",
      country: "Spain",
      coords: [2.17, 41.38],
      labelOffset: [-10, 0],
      labelAnchor: "end",
    },
    {
      name: "Lisbon",
      country: "Portugal",
      coords: [-9.14, 38.72],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
    {
      name: "Porto",
      country: "Portugal",
      coords: [-8.61, 41.15],
      labelOffset: [10, -6],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Barcelona",
      mode: "flight",
      date: "2024",
    },
    {
      number: 2,
      from: "Barcelona",
      to: "Lisbon",
      mode: "flight",
      date: "2024",
    },
    {
      number: 3,
      from: "Lisbon",
      to: "Porto",
      mode: "bus",
      date: "2024",
    },
    {
      number: 4,
      from: "Porto",
      to: "Lisbon",
      mode: "bus",
      date: "2024",
    },
  ],
};

export default trip;
