import { useEffect, useState } from "react";
import { connectWS, subscribe } from "../services/ws";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

import {
  Activity,
  AlertTriangle,
  Shield,
  Brain,
  CloudRain,
  Wind,
} from "lucide-react";

export default function Pipeline() {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    connectWS();

    subscribe((newData) => {
      setData(newData);

      setHistory((prev) => {
        const updated = [...prev, { risk: newData.prediction.risk }];
        return updated.slice(-20); // smoother + realistic
      });

      // 🔊 Alert only if real danger
      if (newData.alert && newData.prediction.risk > 0.8) {
        new Audio("/alert.mp3").play();
      }
    });
  }, []);

  const setMode = async (mode) => {
    await fetch("http://127.0.0.1:8000/set-mode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode }),
    });
  };

  if (!data) return <h2 style={{ padding: 20 }}>Loading AI System...</h2>;

  const risk = data.prediction.risk;
  const isDanger = risk > 0.8;

  // 🔥 Pipeline Stage Activation Logic
  const stages = [
    { name: "Sensor", active: true },
    { name: "Prediction", active: true },
    { name: "Simulation", active: risk > 0.4 },
    { name: "Decision", active: risk > 0.6 },
    { name: "Action", active: risk > 0.8 },
  ];

  return (
    <div className={isDanger ? "danger fade-in" : "fade-in"} style={{ padding: 20 }}>
      
      {/* 🧠 HEADER */}
      <h1 style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Brain size={28} /> AI Command Center
      </h1>

      {/* 🌦 SCENARIO CONTROL */}
      <div className="card">
        <h3><CloudRain size={18} /> Scenario Control</h3>

        <div style={{ marginTop: 10 }}>
          <button onClick={() => setMode("CALM")}>Calm</button>
          <button onClick={() => setMode("WARNING")}>Warning</button>
          <button onClick={() => setMode("STORM")}>Storm</button>
        </div>

        <h2 style={{ color: "#00E0FF", marginTop: 10 }}>
          Mode: {data.mode}
        </h2>
      </div>

      {/* 🔥 PIPELINE VISUAL FLOW */}
      <div className="grid" style={{ marginTop: 20 }}>
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`card ${stage.active ? "glow pulse" : ""}`}
          >
            {stage.name}
          </div>
        ))}
      </div>

      {/* 📊 DATA CARDS */}
      <div className="grid">

        <div className={`card ${isDanger ? "alert" : ""}`}>
          <h3><Activity size={18} /> Risk</h3>
          <h2 className={isDanger ? "risk-high" : ""}>
            {risk.toFixed(2)}
          </h2>
        </div>

        <div className="card">
          <h3><Shield size={18} /> Decision</h3>
          <h2>{data.agent.action}</h2>
        </div>

        <div className="card">
          <h3><AlertTriangle size={18} /> Confidence</h3>
          <h2>{(data.simulation.confidence * 100).toFixed(0)}%</h2>
        </div>

      </div>

      {/* 📈 GRAPH */}
      <div className="card">
        <h3><Wind size={18} /> Risk Trend</h3>

        <LineChart width={550} height={250} data={history}>
          <XAxis />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="risk"
            stroke="#00E0FF"
            strokeWidth={2}
          />
        </LineChart>
      </div>

      {/* 💡 AI EXPLANATION */}
      <div className="card">
        <h3><Brain size={18} /> AI Explanation</h3>

        <p>
          The system is currently in <b>{data.mode}</b> mode.<br />
          Risk level is <b>{risk.toFixed(2)}</b> indicating{" "}
          <b>{data.prediction.severity}</b> conditions.<br />
          Confidence level is{" "}
          <b>{(data.simulation.confidence * 100).toFixed(0)}%</b>.<br />
          Therefore, the AI has chosen to <b>{data.agent.action}</b>.
        </p>
      </div>

    </div>
  );
}