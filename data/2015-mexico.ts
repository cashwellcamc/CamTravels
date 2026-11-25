import type { Trip } from "./types";

const trip: Trip = {
  slug: "2015-mexico",
  title: "Mexico",
  year: 2015,
  // Oaxaca state — central valley to Pacific coast
  bounds: [
    [-98.5, 15.0],
    [-95.0, 18.5],
  ],
  stops: [
    {
      name: "Oaxaca City",
      country: "Mexico",
      coords: [-96.72, 17.07],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      // Pacific surf town, ~6hr bus through the Sierra Sur mountains
      name: "Puerto Escondido",
      country: "Mexico",
      coords: [-97.07, 15.87],
      labelOffset: [-10, 8],
      labelAnchor: "end",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Oaxaca City",
      mode: "flight",
      date: "2015",
    },
    {
      number: 2,
      from: "Oaxaca City",
      to: "Puerto Escondido",
      mode: "bus",
      date: "2015",
    },
  ],
};

export default trip;
