import type { Trip } from "./types";

const trip: Trip = {
  slug: "2021-mexico",
  title: "Mexico '21",
  year: 2021,
  // Pacific coast to central plateau
  bounds: [
    [-107.0, 18.5],
    [-97.0, 22.5],
  ],
  stops: [
    {
      name: "Puerto Vallarta",
      country: "Mexico",
      coords: [-105.23, 20.65],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      name: "Mexico City",
      country: "Mexico",
      coords: [-99.13, 19.43],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Puerto Vallarta",
      mode: "flight",
      date: "2021",
    },
    {
      number: 2,
      from: "Puerto Vallarta",
      to: "Mexico City",
      mode: "flight",
      date: "2021",
    },
  ],
};

export default trip;
