import Link from "next/link";
import { trips } from "@/data/index";
import TravelStats from "@/components/TravelStats";

export default function HomePage() {
  const byYear = [...trips].sort((a, b) => b.year - a.year);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Trips</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
        Maps of every place I&apos;ve stayed, the routes between them, and how I got there.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {byYear.map((trip) => (
          <li key={trip.slug}>
            <Link
              href={`/trips/${trip.slug}`}
              className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-coral hover:shadow-sm transition-all"
            >
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">
                {trip.year}
              </div>
              <div className="text-lg font-bold">{trip.title}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {trip.stops.length} stops · {trip.legs.length} legs
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <TravelStats trips={trips} />
    </div>
  );
}
