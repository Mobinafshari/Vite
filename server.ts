import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const PORT = 5173;

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

app.use(express.static(__dirname));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("✅ Client connected via WebSocket");

  ws.send(
    JSON.stringify({ type: "connected", message: "Welcome HMR client!" })
  );

  ws.on("message", (msg) => {
    console.log("📨 Message from client:", msg.toString());
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
