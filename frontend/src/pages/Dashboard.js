import { useEffect, useState } from "react";
import { connectWS } from "../services/ws";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    connectWS(setData);
  }, []);

  if (!data) return <h2>Connecting to AI System...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧠 Sentinel Mesh X Dashboard</h1>

      <h2>📊 Risk Level: {data.prediction.risk}</h2>
      <h3>⚠️ Severity: {data.prediction.severity}</h3>

      <h3>🌧 Rainfall: {data.sensor.rainfall.toFixed(2)}</h3>
      <h3>🌬 Wind: {data.sensor.wind.toFixed(2)}</h3>

      <h2>🤖 Agent Decision: {data.agent.action}</h2>

      {data.alert && (
        <div style={{ color: "red", fontSize: "24px" }}>
          🚨 EMERGENCY ALERT
        </div>
      )}
    </div>
  );
}