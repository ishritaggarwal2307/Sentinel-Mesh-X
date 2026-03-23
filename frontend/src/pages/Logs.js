import { useEffect, useState, useRef } from "react";
import { connectWS, subscribe } from "../services/ws";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const lastLog = useRef(""); // 🔥 store last log

  useEffect(() => {
    connectWS();

    subscribe((data) => {
      const newLog = `Risk: ${data.prediction.risk} | Severity: ${data.prediction.severity} | Action: ${data.agent.action}`;

      // 🔥 prevent duplicate logs
      if (newLog !== lastLog.current) {
        lastLog.current = newLog;

        setLogs((prev) => [...prev.slice(-9), newLog]);
      }
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📜 Agent Logs</h1>

      <div className="card">
        {logs.length === 0 ? (
          <p>No logs yet...</p>
        ) : (
          logs.map((log, index) => (
            <p key={index} style={{ marginBottom: 10 }}>
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  );
}