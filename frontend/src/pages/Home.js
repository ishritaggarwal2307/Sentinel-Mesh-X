export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🧠 Sentinel Mesh X</h1>
      <h3 style={{ color: "#00E0FF" }}>
        Autonomous Digital Immune System
      </h3>

      <div className="grid">
        <div className="card">
          <h3>System Status</h3>
          <p style={{ color: "#00E0FF" }}>🟢 ONLINE</p>
        </div>

        <div className="card">
          <h3>AI Engine</h3>
          <p>Real-Time Autonomous Decision System</p>
        </div>

        <div className="card">
          <h3>Mode</h3>
          <p>Offline Ready | Resilient</p>
        </div>
      </div>
    </div>
  );
}