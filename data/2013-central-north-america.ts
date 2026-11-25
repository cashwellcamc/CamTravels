import type { Trip } from "./types";

const trip: Trip = {
  slug: "2013-central-north-america",
  title: "Central & North America",
  year: 2013,
  bounds: [
    [-122.0, 7.0],
    [-73.0, 36.5],
  ],
  stops: [
    {
      name: "Panama City",
      country: "Panama",
      coords: [-79.52, 8.99],
      labelOffset: [-10, 6],
      labelAnchor: "end",
    },
    {
      name: "Boquete",
      country: "Panama",
      coords: [-82.44, 8.78],
      labelOffset: [-10, -12],
      labelAnchor: "end",
    },
    {
      name: "Bocas del Toro",
      country: "Panama",
      coords: [-82.24, 9.34],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      name: "Cartagena",
      country: "Colombia",
      coords: [-75.51, 10.40],
      labelOffset: [-10, 0],
      labelAnchor: "end",
    },
    {
      name: "Mazatlán",
      country: "Mexico",
      coords: [-106.41, 23.24],
      labelOffset: [10, 0],
      labelAnchor: "start",
    },
    {
      name: "Los Angeles",
      country: "United States",
      coords: [-118.24, 34.05],
      labelOffset: [10, 0],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Panama City",
      mode: "flight",
      date: "2013",
    },
    {
      number: 2,
      from: "Panama City",
      to: "Boquete",
      mode: "bus",
      date: "2013",
    },
    {
      number: 3,
      from: "Boquete",
      to: "Bocas del Toro",
      mode: "ferry",
      date: "2013",
    },
    {
      number: 4,
      from: "Bocas del Toro",
      to: "Panama City",
      mode: "bus",
      date: "2013",
    },
    {
      number: 5,
      from: "Panama City",
      to: "Cartagena",
      mode: "flight",
      date: "2013",
    },
    {
      number: 6,
      from: "Cartagena",
      to: "Mazatlán",
      mode: "flight",
      date: "2013",
    },
    {
      number: 7,
      from: "Mazatlán",
      to: "Los Angeles",
      mode: "flight",
      date: "2013",
    },
  ],
};

export default trip;
