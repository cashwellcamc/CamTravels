import { useState } from "react";
import { trips } from "./data/index";
import TripSidebar from "./components/TripSidebar";
import EsriMap from "./components/EsriMap";

export default function App() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedTrip = trips.find((t) => t.slug === selectedSlug) ?? null;

  return (
    <div className="app-layout">
      <TripSidebar
        trips={trips}
        selectedSlug={selectedSlug}
        onSelect={setSelectedSlug}
      />

      <div className="main-panel">
        <div className="trip-title-bar">
          {selectedTrip ? (
            <>
              <span className="title-text">
                {selectedTrip.title.toUpperCase()}&nbsp;&nbsp;{selectedTrip.year}
              </span>
              <button
                className="title-clear"
                onClick={() => setSelectedSlug(null)}
                aria-label="Clear selection"
              >
                ×
              </button>
            </>
          ) : (
            <span className="title-default">Select a trip from the panel</span>
          )}
        </div>

        <EsriMap selectedTrip={selectedTrip} />
      </div>
    </div>
  );
}
