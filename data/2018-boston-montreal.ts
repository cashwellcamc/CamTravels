import type { Trip } from "./types";

const trip: Trip = {
  slug: "2018-boston-montreal",
  title: "Boston & Montréal",
  year: 2018,
  // US Northeast to Quebec
  bounds: [
    [-76.0, 41.0],
    [-70.0, 46.5],
  ],
  stops: [
    {
      name: "Boston",
      country: "United States",
      coords: [-71.06, 42.36],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
    {
      name: "Montréal",
      country: "Canada",
      coords: [-73.57, 45.51],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Boston",
      mode: "train",
      date: "2018",
    },
    {
      number: 2,
      from: "Boston",
      to: "Montréal",
      mode: "bus",
      date: "2018",
    },
  ],
};

export default trip;
