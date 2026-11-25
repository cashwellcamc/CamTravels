import type { Trip } from "@/data/types";

// UN member + observer states
const WORLD_COUNTRIES = 195;
// Rough count of notable global travel destinations
const WORLD_DESTINATIONS = 1_000;

function getStats(trips: Trip[]) {
  const countries = new Set<string>();
  const destinations = new Set<string>();
  for (const trip of trips) {
    for (const stop of trip.stops) {
      countries.add(stop.country);
      destinations.add(stop.name);
    }
  }
  return { countries: countries.size, destinations: destinations.size };
}

function DonutChart({
  value,
  total,
  label,
  color,
}: {
  value: number;
  total: number;
  label: string;
  color: string;
}) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 62;
  const innerR = 42;
  const pct = Math.min(value / total, 1);

  const startAngle = -Math.PI / 2;
  const sweepAngle = pct * 2 * Math.PI;
  const endAngle = startAngle + sweepAngle;

  const bgPath = [
    `M ${cx} ${cy - outerR}`,
    `A ${outerR} ${outerR} 0 1 1 ${cx - 0.001} ${cy - outerR}`,
    `L ${cx - 0.001} ${cy - innerR}`,
    `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy - innerR}`,
    `Z`,
  ].join(" ");

  let arcPath = "";
  if (pct >= 0.9999) {
    arcPath = bgPath;
  } else if (pct > 0) {
    const osx = cx + outerR * Math.cos(startAngle);
    const osy = cy + outerR * Math.sin(startAngle);
    const oex = cx + outerR * Math.cos(endAngle);
    const oey = cy + outerR * Math.sin(endAngle);
    const iex = cx + innerR * Math.cos(endAngle);
    const iey = cy + innerR * Math.sin(endAngle);
    const isx = cx + innerR * Math.cos(startAngle);
    const isy = cy + innerR * Math.sin(startAngle);
    const large = sweepAngle > Math.PI ? 1 : 0;
    arcPath = [
      `M ${osx.toFixed(2)} ${osy.toFixed(2)}`,
      `A ${outerR} ${outerR} 0 ${large} 1 ${oex.toFixed(2)} ${oey.toFixed(2)}`,
      `L ${iex.toFixed(2)} ${iey.toFixed(2)}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${isx.toFixed(2)} ${isy.toFixed(2)}`,
      `Z`,
    ].join(" ");
  }

  const pctStr =
    pct === 0 ? "0%" : pct < 0.001 ? "<0.1%" : `${(pct * 100).toFixed(1)}%`;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`${label}: ${pctStr}`}
      >
        <path d={bgPath} className="fill-gray-200 dark:fill-gray-700" />
        {arcPath && <path d={arcPath} fill={color} />}
        <text
          x={cx}
          y={cy - 5}
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          className="fill-gray-800 dark:fill-gray-100"
        >
          {pctStr}
        </text>
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          fontSize="10"
          className="fill-gray-400 dark:fill-gray-500"
        >
          {value} of {total.toLocaleString()}
        </text>
      </svg>
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}

export default function TravelStats({ trips }: { trips: Trip[] }) {
  const { countries, destinations } = getStats(trips);

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-6">
        World explored
      </h2>
      <div className="flex justify-around max-w-xs mx-auto">
        <DonutChart
          value={countries}
          total={WORLD_COUNTRIES}
          label="Countries"
          color="#D85A30"
        />
        <DonutChart
          value={destinations}
          total={WORLD_DESTINATIONS}
          label="Destinations"
          color="#1D9E75"
        />
      </div>
    </section>
  );
}
