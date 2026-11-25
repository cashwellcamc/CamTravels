import type { Trip } from "./types";

const trip: Trip = {
  slug: "2012-peru",
  title: "Peru",
  year: 2012,
  // Lima coast to Machu Picchu region
  bounds: [
    [-78.0, -14.5],
    [-71.0, -11.0],
  ],
  stops: [
    {
      // Miraflores — upscale coastal district of Lima
      name: "Miraflores",
      country: "Peru",
      coords: [-77.03, -12.12],
      labelOffset: [-10, 10],
      labelAnchor: "end",
    },
    {
      name: "Lima",
      country: "Peru",
      coords: [-77.04, -12.05],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      // Aguas Calientes — town at the base of Machu Picchu
      name: "Aguas Calientes",
      country: "Peru",
      coords: [-72.52, -13.16],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      name: "Machu Picchu",
      country: "Peru",
      coords: [-72.54, -13.26],
      labelOffset: [10, 10],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Miraflores",
      mode: "flight",
      date: "2012",
    },
    {
      number: 2,
      from: "Miraflores",
      to: "Lima",
      mode: "bus",
      date: "2012",
    },
    {
      number: 3,
      from: "Lima",
      to: "Aguas Calientes",
      mode: "train",
      date: "2012",
    },
    {
      number: 4,
      from: "Aguas Calientes",
      to: "Machu Picchu",
      mode: "bus",
      date: "2012",
    },
  ],
};

export default trip;
