import type { Trip } from "./types";

const trip: Trip = {
  slug: "2016-dominican-republic",
  title: "Dominican Republic",
  year: 2016,
  // North coast focus with enough DR context around it
  bounds: [
    [-72.0, 18.0],
    [-68.5, 21.5],
  ],
  stops: [
    {
      name: "Cabarete",
      country: "Dominican Republic",
      coords: [-70.42, 19.75],
      labelOffset: [10, -8],
      labelAnchor: "start",
    },
    {
      name: "Sosúa",
      country: "Dominican Republic",
      coords: [-70.52, 19.76],
      labelOffset: [-10, -8],
      labelAnchor: "end",
    },
    {
      name: "Encuentro Beach",
      country: "Dominican Republic",
      coords: [-70.47, 19.73],
      labelOffset: [10, 10],
      labelAnchor: "start",
    },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Cabarete",
      mode: "flight",
      date: "2016",
    },
    {
      number: 2,
      from: "Cabarete",
      to: "Sosúa",
      mode: "bus",
      date: "2016",
    },
    {
      number: 3,
      from: "Sosúa",
      to: "Encuentro Beach",
      mode: "bus",
      date: "2016",
    },
  ],
};

export default trip;
