import { useEffect, useState } from "react";
import { connectWS, subscribe } from "../services/ws";

export default function Alerts() {
  const [data, setData] = useState(null);

  useEffect(() => {
    connectWS();
    subscribe(setData);
  }, []);

  if (!data) return <h2 style={{ padding: 20 }}>🚨 Loading Alerts...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🚨 Emergency Alerts</h1>

      {data.alert ? (
        <div className="alert">
          ⚠️ HIGH RISK DETECTED
        </div>
      ) : (
        <div className="card">
          <p style={{ color: "#00E0FF" }}>
            ✅ No Active Alerts
          </p>
        </div>
      )}
    </div>
  );
}