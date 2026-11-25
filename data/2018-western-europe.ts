import type { Trip } from "./types";

const trip: Trip = {
  slug: "2018-western-europe",
  title: "Western Europe",
  year: 2018,
  // Extended north/south to fill the portrait viewport
  bounds: [
    [-2.0, 48.5],
    [6.5, 54.0],
  ],
  stops: [
    {
      name: "London",
      country: "United Kingdom",
      coords: [-0.12, 51.51],
      labelOffset: [-10, 0],
      labelAnchor: "end",
    },
    {
      // Ferry landing — Zeebrugge port, Bruges is the city people visit
      name: "Bruges",
      country: "Belgium",
      coords: [3.22, 51.21],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      name: "Brussels",
      country: "Belgium",
      coords: [4.35, 50.85],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
    {
      name: "Amsterdam",
      country: "Netherlands",
      coords: [4.90, 52.37],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "London",
      mode: "flight",
      date: "2018",
    },
    {
      number: 2,
      from: "London",
      to: "Bruges",
      mode: "ferry",
      date: "2018",
    },
    {
      number: 3,
      from: "Bruges",
      to: "Brussels",
      mode: "train",
      date: "2018",
    },
    {
      number: 4,
      from: "Brussels",
      to: "Amsterdam",
      mode: "train",
      date: "2018",
    },
    {
      number: 5,
      from: "Amsterdam",
      to: "London",
      mode: "train",
      date: "2018",
    },
  ],
};

export default trip;
