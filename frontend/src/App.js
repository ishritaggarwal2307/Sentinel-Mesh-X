import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Pages
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Decision from "./pages/Decision";
import Pipeline from "./pages/Pipeline";
import Map from "./pages/Map";   // ✅ KEEP MAP
import Alerts from "./pages/Alerts";
import Logs from "./pages/Logs";

// 🔹 Layout (Sidebar UI)
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* 🏠 Home */}
          <Route path="/" element={<Home />} />

          {/* 📊 Analytics */}
          <Route path="/analytics" element={<Analytics />} />

          {/* 🤖 Decision */}
          <Route path="/decision" element={<Decision />} />

          {/* ⚡ Pipeline */}
          <Route path="/pipeline" element={<Pipeline />} />

          {/* 🗺 MAP (IMPORTANT) */}
          <Route path="/map" element={<Map />} />

          {/* 🚨 Alerts */}
          <Route path="/alerts" element={<Alerts />} />

          {/* 📜 Logs */}
          <Route path="/logs" element={<Logs />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;