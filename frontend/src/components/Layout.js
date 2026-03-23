import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const navItem = (path, label) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          textDecoration: "none",
          color: isActive ? "#00E0FF" : "#aaa",
          background: isActive ? "rgba(0,224,255,0.1)" : "transparent",
          border: isActive ? "1px solid #00E0FF" : "1px solid transparent",
          transition: "0.3s",
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* 🔵 SIDEBAR */}
      <div
        style={{
          width: "230px",
          background: "#050A18",
          padding: "20px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* 🧠 LOGO */}
        <div>
          <h2
            style={{
              color: "#00E0FF",
              marginBottom: "30px",
              letterSpacing: "1px",
            }}
          >
            ⚡ Sentinel Mesh X
          </h2>

          {/* 🔗 NAVIGATION */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {navItem("/", "🏠 Home")}
            {navItem("/analytics", "📊 Analytics")}
            {navItem("/decision", "🤖 Decision")}
            {navItem("/pipeline", "⚡ Pipeline")}
            {navItem("/map", "🗺 Map")}
            {navItem("/alerts", "🚨 Alerts")}
            {navItem("/logs", "📜 Logs")}
          </nav>
        </div>

        {/* ⚙️ FOOTER STATUS */}
        <div style={{ fontSize: "12px", color: "#666" }}>
          <p>System Status: 🟢 Online</p>
          <p>Mode: Autonomous</p>
        </div>
      </div>

      {/* 🟢 MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "25px",
          overflowY: "auto",
          background: "#0B1220",
        }}
      >
        {children}
      </div>
    </div>
  );
}