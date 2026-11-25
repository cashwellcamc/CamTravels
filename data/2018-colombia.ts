import type { Trip } from "./types";

const trip: Trip = {
  slug: "2018-colombia",
  title: "Colombia",
  year: 2018,
  bounds: [
    [-77.0, 5.0],
    [-73.5, 11.5],
  ],
  stops: [
    {
      name: "Cartagena",
      country: "Colombia",
      coords: [-75.51, 10.40],
      labelOffset: [-10, 0],
      labelAnchor: "end",
    },
    {
      // "La Penal Mountain" — El Peñón de Guatapé, the giant rock
      name: "El Peñón",
      country: "Colombia",
      coords: [-75.16, 6.21],
      labelOffset: [8, -10],
      labelAnchor: "start",
    },
    {
      // "Guadalpou town" — Guatapé, the colorful town next to El Peñón
      name: "Guatapé",
      country: "Colombia",
      coords: [-75.16, 6.23],
      labelOffset: [8, 12],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Cartagena",
      mode: "flight",
      date: "2018",
    },
    {
      number: 2,
      from: "Cartagena",
      to: "El Peñón",
      mode: "flight",
      date: "2018",
    },
    {
      number: 3,
      from: "El Peñón",
      to: "Guatapé",
      mode: "bus",
      date: "2018",
    },
  ],
};

export default trip;
