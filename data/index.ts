import type { Trip } from "./types";
import southeastAsia2026 from "./2026-southeast-asia";
import iberianPeninsula2024 from "./2024-iberian-peninsula";
import crossCountry2021 from "./2021-cross-country";
import puertoRico2017 from "./2017-puerto-rico";
import colombia2018 from "./2018-colombia";
import westernEurope2018 from "./2018-western-europe";
import southeastAsia2016 from "./2016-southeast-asia";
import dominicanRepublic2016 from "./2016-dominican-republic";
import centralNorthAmerica2013 from "./2013-central-north-america";

// Add new trips here — they'll automatically appear on the index page
export const trips: Trip[] = [
  southeastAsia2026,
  iberianPeninsula2024,
  crossCountry2021,
  colombia2018,
  westernEurope2018,
  southeastAsia2016,
  dominicanRepublic2016,
  puertoRico2017,
  centralNorthAmerica2013,
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}
