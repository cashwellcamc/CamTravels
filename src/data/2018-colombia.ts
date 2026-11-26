import type { Trip } from "./types";

const trip: Trip = {
  slug: "2018-colombia",
  title: "Colombia",
  year: 2018,
  // Antioquia region: Medellín, El Peñón, Guatapé
  bounds: [
    [-76.0, 5.5],
    [-74.5, 7.0],
  ],
  stops: [
    {
      name: "Medellín",
      country: "Colombia",
      coords: [-75.56, 6.23],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      // El Peñón de Guatapé — the giant rock
      name: "El Peñón",
      country: "Colombia",
      coords: [-75.16, 6.21],
      labelOffset: [8, -10],
      labelAnchor: "start",
    },
    {
      // Guatapé — the colorful town next to El Peñón
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
      to: "Medellín",
      mode: "flight",
      date: "2018",
    },
    {
      number: 2,
      from: "Medellín",
      to: "El Peñón",
      mode: "bus",
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
