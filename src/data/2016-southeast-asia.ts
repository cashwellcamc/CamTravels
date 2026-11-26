import type { Trip } from "./types";

const trip: Trip = {
  slug: "2016-southeast-asia",
  title: "Southeast Asia",
  year: 2016,
  // Covers southern Thailand + Bali
  bounds: [
    [97.0, -10.5],
    [117.5, 15.0],
  ],
  stops: [
    {
      name: "Bangkok",
      country: "Thailand",
      coords: [100.75, 13.69],
      labelOffset: [10, -6],
      labelAnchor: "start",
    },
    {
      name: "Krabi",
      country: "Thailand",
      coords: [98.92, 8.05],
      labelOffset: [-10, -12],
      labelAnchor: "end",
    },
    {
      name: "Koh Phi Phi",
      country: "Thailand",
      coords: [98.77, 7.74],
      labelOffset: [8, 14],
      labelAnchor: "start",
    },
    {
      name: "Phuket",
      country: "Thailand",
      coords: [98.39, 7.89],
      labelOffset: [-10, 8],
      labelAnchor: "end",
    },
    {
      name: "Koh Samui",
      country: "Thailand",
      coords: [100.06, 9.54],
      labelOffset: [8, 12],
      labelAnchor: "start",
    },
    {
      name: "Koh Pha Ngan",
      country: "Thailand",
      coords: [100.06, 9.73],
      labelOffset: [8, -6],
      labelAnchor: "start",
    },
    {
      name: "Koh Tao",
      country: "Thailand",
      coords: [99.84, 10.09],
      labelOffset: [-8, -10],
      labelAnchor: "end",
    },
    {
      name: "Canggu",
      country: "Indonesia",
      coords: [115.13, -8.65],
      labelOffset: [-10, 6],
      labelAnchor: "end",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Bangkok",
      mode: "flight",
      date: "2016",
    },
    {
      number: 2,
      from: "Bangkok",
      to: "Krabi",
      mode: "bus",
      date: "2016",
    },
    {
      number: 3,
      from: "Krabi",
      to: "Koh Phi Phi",
      mode: "ferry",
      date: "2016",
    },
    {
      number: 4,
      from: "Koh Phi Phi",
      to: "Phuket",
      mode: "ferry",
      date: "2016",
    },
    {
      number: 5,
      from: "Phuket",
      to: "Koh Samui",
      mode: "bus",
      date: "2016",
    },
    {
      number: 6,
      from: "Koh Samui",
      to: "Koh Pha Ngan",
      mode: "ferry",
      date: "2016",
    },
    {
      number: 7,
      from: "Koh Pha Ngan",
      to: "Koh Tao",
      mode: "ferry",
      date: "2016",
    },
    {
      number: 8,
      from: "Koh Tao",
      to: "Bangkok",
      mode: "bus",
      date: "2016",
    },
    {
      number: 9,
      from: "Bangkok",
      to: "Canggu",
      mode: "flight",
      date: "2016",
    },
  ],
};

export default trip;
