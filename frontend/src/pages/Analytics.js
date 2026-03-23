import { useEffect, useState } from "react";
import { connectWS, subscribe } from "../services/ws";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    connectWS();

    subscribe((newData) => {
      setData(newData);

      // 🔥 store history for chart
      setHistory((prev) => [
        ...prev.slice(-20),
        {
          time: new Date().toLocaleTimeString(),
          risk: newData.prediction.risk,
        },
      ]);
    });
  }, []);

  if (!data) return <h2 style={{ padding: 20 }}>📊 Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Analytics Dashboard</h1>

      {/* CARDS */}
      <div className="grid">
        <div className="card">
          <h3>Risk Level</h3>
          <h2 style={{ color: "#00E0FF" }}>
            {data.prediction.risk}
          </h2>
        </div>

        <div className="card">
          <h3>Severity</h3>
          <h2>{data.prediction.severity}</h2>
        </div>
      </div>

      {/* 🔥 CHART */}
      <div className="card">
        <h3>📈 Risk Over Time</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#00E0FF"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}