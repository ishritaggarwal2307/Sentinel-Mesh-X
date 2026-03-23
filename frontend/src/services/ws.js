let ws = null;
let listeners = [];

// 🔥 subscribe function (multiple pages can listen)
export function subscribe(callback) {
  listeners.push(callback);
}

// 🔥 notify all pages
function notifyAll(data) {
  listeners.forEach((cb) => cb(data));
}

export function connectWS() {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("ws://127.0.0.1:8000/ws");

  ws.onopen = () => {
    console.log("✅ WebSocket Connected");
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      notifyAll(data); // 🔥 send to all pages
    } catch (err) {
      console.error("Parse error:", err);
    }
  };

  ws.onerror = (err) => {
    console.error("❌ WebSocket error:", err);
  };

  ws.onclose = () => {
    console.warn("⚠️ Reconnecting...");
    setTimeout(() => connectWS(), 2000);
  };
}