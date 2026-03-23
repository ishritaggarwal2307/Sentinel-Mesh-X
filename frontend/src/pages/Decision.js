import { useEffect, useState } from "react";
import { connectWS, subscribe } from "../services/ws";
import { Brain, Shield, Activity } from "lucide-react";

export default function Decision() {
  const [data, setData] = useState(null);

  useEffect(() => {
    connectWS();

    subscribe((newData) => {
      setData(newData);
    });
  }, []);

  // ✅ LOADING STATE (PREVENTS CRASH)
  if (!data || !data.prediction) {
    return <h2 style={{ padding: 20 }}>Loading AI Decision Engine...</h2>;
  }

  // ✅ SAFE VARIABLES
  const risk = data?.prediction?.risk ?? 0;
  const severity = data?.prediction?.severity ?? "UNKNOWN";
  const action = data?.agent?.action ?? "MONITOR";
  const confidence = data?.simulation?.confidence ?? 0;
  const trend = data?.trend ?? "stable";

  // 🔥 DYNAMIC COLORS
  const getColor = () => {
    if (risk > 0.8) return "#FF3B3B";
    if (risk > 0.5) return "#FFA500";
    return "#00E0FF";
  };

  return (
    <div className={`fade-in ${risk > 0.8 ? "danger" : ""}`} style={{ padding: 20 }}>

      {/* 🧠 HEADER */}
      <h1 style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Brain size={28} /> AI Decision Engine
      </h1>

      {/* 📊 DATA CARDS */}
      <div className="grid">

        {/* 🔥 RISK */}
        <div className="card">
          <h3><Activity size={18} /> Risk Score</h3>
          <h2 style={{ color: getColor() }}>
            {risk.toFixed(2)}
          </h2>
          <p>Severity: {severity}</p>
        </div>

        {/* 🛡 DECISION */}
        <div className="card">
          <h3><Shield size={18} /> Final Decision</h3>

          <h1
            style={{
              fontSize: "36px",
              color: getColor(),
              fontWeight: "bold",
            }}
          >
            {action}
          </h1>

          <p>Confidence: {(confidence * 100).toFixed(0)}%</p>
        </div>

      </div>

      {/* 💡 AI EXPLANATION */}
      <div className="card">
        <h3><Brain size={18} /> AI Reasoning</h3>

        <p>
          The system analyzed environmental conditions and calculated a risk score of{" "}
          <b>{risk.toFixed(2)}</b>, which falls under <b>{severity}</b> severity.
          <br /><br />
          The trend is currently <b>{trend}</b>, indicating how conditions are evolving.
          <br /><br />
          Based on simulation confidence of{" "}
          <b>{(confidence * 100).toFixed(0)}%</b>, the system selected{" "}
          <b>{action}</b> as the optimal response.
        </p>
      </div>

    </div>
  );
}