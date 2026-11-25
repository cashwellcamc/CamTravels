import type { Trip } from "./types";

const trip: Trip = {
  slug: "2026-southeast-asia",
  title: "Southeast Asia",
  year: 2026,
  bounds: [
    [95.6, 0.7],
    [111.2, 23.6],
  ],
  stops: [
    { name: "Ho Chi Minh City", country: "Vietnam",  coords: [106.66, 10.82], labelOffset: [-10,  10], labelAnchor: "end"   },
    { name: "Da Lat",           country: "Vietnam",  coords: [108.44, 11.94], labelOffset: [ 10,   2], labelAnchor: "start" },
    { name: "Hanoi",            country: "Vietnam",  coords: [105.85, 21.03], labelOffset: [ 10,   8], labelAnchor: "start" },
    { name: "Sapa",             country: "Vietnam",  coords: [103.84, 22.34], labelOffset: [-10, -14], labelAnchor: "end"   },
    { name: "Chiang Mai",       country: "Thailand", coords: [ 98.98, 18.79], labelOffset: [-10,   0], labelAnchor: "end"   },
    { name: "Krabi",            country: "Thailand", coords: [ 98.92,  8.05], labelOffset: [-10,   0], labelAnchor: "end"   },
    { name: "Kuala Lumpur",     country: "Malaysia", coords: [101.71,  2.74], labelOffset: [ 10,   0], labelAnchor: "start" },
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",
      to: "Ho Chi Minh City",
      mode: "flight",
      date: "Sep 3",
      carrier: "ANA / United",
    },
    {
      number: 2,
      from: "Ho Chi Minh City",
      to: "Da Lat",
      mode: "flight",
      date: "Sep 18",
      carrier: "VietJet VJ362",
    },
    {
      number: 3,
      from: "Da Lat",
      to: "Hanoi",
      mode: "flight",
      date: "Sep 24",
      carrier: "VietJet",
      approx: true,
    },
    {
      number: 4,
      from: "Hanoi",
      to: "Sapa",
      mode: "bus",
      date: "Sep 30",
      carrier: "Limo Bus",
    },
    {
      number: 5,
      from: "Sapa",
      to: "Hanoi",
      mode: "bus",
      date: "Oct 4",
      carrier: "Sapa Express",
    },
    {
      number: 6,
      from: "Hanoi",
      to: "Chiang Mai",
      mode: "flight",
      date: "Oct 7",
      carrier: "AirAsia FD871",
    },
    {
      number: 7,
      from: "Chiang Mai",
      to: "Krabi",
      mode: "flight",
      date: "Nov 12",
      carrier: "VietJet",
    },
    {
      number: 8,
      from: "Krabi",
      to: "Kuala Lumpur",
      mode: "flight",
      date: "Dec 1",
      upcoming: true,
    },
  ],
};

export default trip;
