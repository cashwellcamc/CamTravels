import type { Trip } from "./types";

const trip: Trip = {
  slug: "2017-puerto-rico",
  title: "Puerto Rico",
  year: 2017,
  // Shows the full island with surrounding Caribbean context
  bounds: [
    [-68.0, 17.5],
    [-65.0, 20.5],
  ],
  stops: [
    {
      name: "Aguadilla",
      country: "Puerto Rico",
      coords: [-67.15, 18.43],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      name: "Rincón",
      country: "Puerto Rico",
      coords: [-67.25, 18.34],
      labelOffset: [-10, 8],
      labelAnchor: "end",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Aguadilla",
      mode: "flight",
      date: "2017",
    },
    {
      number: 2,
      from: "Aguadilla",
      to: "Rincón",
      mode: "car",
      date: "2017",
    },
  ],
};

export default trip;
