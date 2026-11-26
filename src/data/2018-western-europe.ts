import type { Trip } from "./types";

const trip: Trip = {
  slug: "2018-western-europe",
  title: "Europe",
  year: 2018,
  // Extended to include Iceland in the upper-left
  bounds: [
    [-23.0, 48.5],
    [7.0, 65.5],
  ],
  stops: [
    {
      name: "Reykjavik",
      country: "Iceland",
      coords: [-21.90, 64.13],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
    {
      name: "London",
      country: "United Kingdom",
      coords: [-0.12, 51.51],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      name: "Brussels",
      country: "Belgium",
      coords: [4.35, 50.85],
      labelOffset: [-10, 8],
      labelAnchor: "end",
    },
    {
      name: "Amsterdam",
      country: "Netherlands",
      coords: [4.90, 52.37],
      labelOffset: [-10, -10],
      labelAnchor: "end",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Reykjavik",
      mode: "flight",
      date: "2018",
    },
    {
      number: 2,
      from: "Reykjavik",
      to: "London",
      mode: "flight",
      date: "2018",
    },
    {
      // Took a ferry to Belgium then immediately transferred to a FlixBus to Brussels
      number: 3,
      from: "London",
      to: "Brussels",
      mode: "ferry",
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
