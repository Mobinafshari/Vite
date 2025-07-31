import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

const ws = new WebSocket("ws://localhost:5173");

ws.addEventListener("open", () => {
  console.log("✅ Connected to HMR WebSocket server");
  ws.send("Hello from client!");
});

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("📩 Message from server:", data);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
