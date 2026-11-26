import type { Trip } from "./types";

const trip: Trip = {
  slug: "2017-oaxaca-coast",
  title: "Oaxaca Coast",
  year: 2017,
  // Oaxacan Pacific coast
  bounds: [
    [-98.0, 15.0],
    [-95.5, 17.5],
  ],
  stops: [
    {
      name: "Puerto Escondido",
      country: "Mexico",
      coords: [-97.07, 15.87],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      // Small fishing village / beach town ~70km southeast
      name: "Puerto Ángel",
      country: "Mexico",
      coords: [-96.49, 15.67],
      labelOffset: [10, 8],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Puerto Escondido",
      mode: "flight",
      date: "2017",
    },
    {
      number: 2,
      from: "Puerto Escondido",
      to: "Puerto Ángel",
      mode: "bus",
      date: "2017",
    },
  ],
};

export default trip;
