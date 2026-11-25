import type { Trip } from "./types";
import southeastAsia2026 from "./2026-southeast-asia";
import iberianPeninsula2024 from "./2024-iberian-peninsula";
import crossCountry2021 from "./2021-cross-country";
import southeastAsia2016 from "./2016-southeast-asia";
import centralNorthAmerica2013 from "./2013-central-north-america";

// Add new trips here — they'll automatically appear on the index page
export const trips: Trip[] = [
  southeastAsia2026,
  iberianPeninsula2024,
  crossCountry2021,
  southeastAsia2016,
  centralNorthAmerica2013,
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}
