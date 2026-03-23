import { useEffect, useState } from "react";
import { connectWS, subscribe } from "../services/ws";

export default function Map() {
  const [zones, setZones] = useState(null);

  useEffect(() => {
    connectWS();

    subscribe((data) => {
      const baseRisk = data.prediction.risk;

      // 🔥 create variation
      setZones([
        { name: "Zone A", risk: baseRisk },
        { name: "Zone B", risk: Math.max(0, baseRisk - 0.2) },
        { name: "Zone C", risk: Math.min(1, baseRisk + 0.15) },
      ]);
    });
  }, []);

  if (!zones) return <h2 style={{ padding: 20 }}>Loading Map...</h2>;

  const getColor = (risk) => {
    if (risk > 0.7) return "#FF3B3B";
    if (risk > 0.4) return "orange";
    return "#00E0FF";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🗺️ City Risk Map</h1>

      <div className="grid">
        {zones.map((zone, i) => (
          <div
            key={i}
            className="card"
            style={{
              background: getColor(zone.risk),
              transition: "0.5s",
            }}
          >
            <h3>{zone.name}</h3>
            <p>Risk: {zone.risk.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}