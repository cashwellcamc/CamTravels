import type { Trip } from "../data/types";

interface Props {
  trips: Trip[];
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
}

export default function TripSidebar({ trips, selectedSlug, onSelect }: Props) {
  const sorted = [...trips].sort((a, b) => b.year - a.year);

  const handleClick = (slug: string) => {
    // Clicking the active trip deselects it
    onSelect(slug === selectedSlug ? null : slug);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">CAM&apos;S TRAVELS</span>
        <p className="sidebar-hint">Select a trip to explore</p>
      </div>

      <nav className="trip-list">
        {sorted.map((trip) => {
          const active = trip.slug === selectedSlug;
          return (
            <button
              key={trip.slug}
              className={`trip-item ${active ? "trip-item--active" : ""}`}
              onClick={() => handleClick(trip.slug)}
              aria-pressed={active}
            >
              <span
                className={`trip-indicator ${active ? "trip-indicator--on" : ""}`}
                aria-hidden="true"
              />
              <div className="trip-item-text">
                <span className="trip-item-year">{trip.year}</span>
                <span className="trip-item-title">{trip.title}</span>
                <span className="trip-item-meta">
                  {trip.stops.length} stops · {trip.legs.length} legs
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-legend">
        <div className="legend-title">LEGEND</div>
        <div className="legend-row">
          <svg width="28" height="10" aria-hidden="true">
            <line x1="0" y1="5" x2="28" y2="5" stroke="#D85A30" strokeWidth="2" strokeDasharray="5 3" />
          </svg>
          <span>Flight</span>
        </div>
        <div className="legend-row">
          <svg width="28" height="10" aria-hidden="true">
            <line x1="0" y1="5" x2="28" y2="5" stroke="#1D9E75" strokeWidth="2" />
          </svg>
          <span>Bus / Train / Ferry</span>
        </div>
        <div className="legend-row">
          <svg width="28" height="10" aria-hidden="true">
            <line x1="0" y1="5" x2="28" y2="5" stroke="#888780" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
          <span>Upcoming</span>
        </div>
      </div>
    </aside>
  );
}
