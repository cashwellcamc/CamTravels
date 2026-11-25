import type { Trip, Leg, TransportMode } from "@/data/types";

const MODE_LABEL: Record<TransportMode, string> = {
  flight: "Flight",
  bus: "Bus",
  train: "Train",
  ferry: "Ferry",
  car: "Drive",
};

const MODE_COLOR: Record<TransportMode, string> = {
  flight: "#D85A30",
  bus: "#1D9E75",
  train: "#1D9E75",
  ferry: "#1D9E75",
  car: "#6366F1",
};

function badgeStyle(leg: Leg): React.CSSProperties {
  if (leg.upcoming) return { backgroundColor: "#888780" };
  return { backgroundColor: MODE_COLOR[leg.mode] };
}

interface Props {
  trip: Trip;
}

export default function LegList({ trip }: Props) {
  return (
    <ol className="space-y-3">
      {trip.legs.map((leg) => (
        <li key={leg.number} className="flex gap-3 items-start">
          {/* Numbered badge */}
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
            style={badgeStyle(leg)}
          >
            {leg.number}
          </span>

          {/* Leg detail */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {leg.from}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">→</span>
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {leg.to}
              </span>
              {leg.upcoming && (
                <span className="text-xs text-[#888780] font-medium">(upcoming)</span>
              )}
            </div>
            <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0 text-xs text-gray-500 dark:text-gray-400">
              <span>{MODE_LABEL[leg.mode]}</span>
              <span>·</span>
              <span>
                {leg.approx && "~"}
                {leg.date}
              </span>
              {leg.carrier && (
                <>
                  <span>·</span>
                  <span>{leg.carrier}</span>
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
