import { notFound } from "next/navigation";
import { trips, getTripBySlug } from "@/data/index";
import TripMap from "@/components/TripMap";
import LegList from "@/components/LegList";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  return { title: `${trip.title} ${trip.year} — Cam's Travels` };
}

export default async function TripPage({ params }: Props) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const countries = [...new Set(trip.stops.map((s) => s.country))].join(", ");

  // Build legend from modes actually present in the trip
  const modes = new Set(trip.legs.map((l) => l.mode));
  const hasUpcoming = trip.legs.some((l) => l.upcoming);
  type LegendItem = { label: string; color: string; dash?: string };
  const legend: LegendItem[] = [];
  if (modes.has("flight"))
    legend.push({ label: "Flight", color: "#D85A30", dash: "6 3" });
  if (modes.has("bus") || modes.has("train") || modes.has("ferry"))
    legend.push({ label: "Bus / Train / Ferry", color: "#1D9E75" });
  if (modes.has("car"))
    legend.push({ label: "Drive", color: "#6366F1" });
  if (hasUpcoming)
    legend.push({ label: "Upcoming", color: "#888780", dash: "4 4" });

  return (
    <div>
      <div className="mb-6">
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">
          {trip.year}
        </div>
        <h1 className="text-3xl font-bold">{trip.title}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{countries}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Map — respects per-trip dimensions */}
        <div className="w-full lg:flex-1">
          <TripMap
            trip={trip}
            width={trip.mapWidth}
            height={trip.mapHeight}
          />
        </div>

        {/* Leg list + legend */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Itinerary
          </h2>
          <LegList trip={trip} />

          <div className="mt-8 space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Legend
            </h3>
            {legend.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
              >
                <svg width="28" height="10" aria-hidden="true">
                  <line
                    x1="0" y1="5" x2="28" y2="5"
                    stroke={item.color}
                    strokeWidth="2"
                    strokeDasharray={item.dash}
                  />
                </svg>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
