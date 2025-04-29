import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import chokidar from "chokidar";
import { buildGraph, moduleGraph } from "./createModuleGraph.js";
import { parse } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "dist");

// Check if directory exists before starting server
if (!fs.existsSync(publicDir)) {
  console.error(`❌ Error: Directory "${publicDir}" does not exist`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : parse(req.url).pathname;
  let fullPath = path.join(__dirname, "dist", filePath);

  // Simple static file serving
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    // Basic content-type detection
    if (filePath.endsWith(".html")) {
      res.setHeader("Content-Type", "text/html");
    } else if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }

    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("🔌 WebSocket client connected");

  socket.send(
    JSON.stringify({
      type: "connected",
      message: "Hello from dev server WebSocket 👋",
    })
  );
});

const watcher = chokidar.watch(path.join(__dirname, "dist"), {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  ignoreInitial: true,
});

watcher.on("change", (filePath) => {
  buildGraph("./dist/main.js");
  const mustChanges = [...moduleGraph.entries()].find((entry) =>
    entry[0].includes(filePath)
  );
  console.log('===>>>',filePath);

  // Notify all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(
        JSON.stringify({
          type: "reload",
          file: mustChanges,
        })
      );
    }
  });
});

server.listen(5173, () => {
  try {
    console.log("✅ Dev server running at http://localhost:5173");
  } catch (error) {
    console.error("❌ Dev server failed to start", error);
  }
});
