import type { Trip } from "./types";

// Copy this file and rename it, e.g. "2027-japan.ts"
// Then import it in data/index.ts and add it to the trips array.

const trip: Trip = {
  slug: "YYYY-region",           // URL slug, e.g. "2027-japan"
  title: "Region Name",          // Display title, e.g. "Japan"
  year: 2027,
  bounds: [
    [0, 0],   // TODO: replace with [minLon, minLat] — southwest corner
    [0, 0],   // TODO: replace with [maxLon, maxLat] — northeast corner
  ],
  stops: [
    // Only include cities you actually stayed in — no layovers.
    { name: "City Name", country: "Country", coords: [0, 0] }, // TODO: real [lon, lat]
  ],
  legs: [
    {
      number: 1,
      from: "Washington DC",     // Use "Washington DC" for the home origin
      to: "City Name",
      mode: "flight",            // "flight" | "bus" | "train" | "ferry"
      date: "Month DD",
      carrier: "Airline / Operator",
      // approx: true,           // uncomment if date is approximate
      // upcoming: true,         // uncomment if leg hasn't happened yet
    },
  ],
};

export default trip;
