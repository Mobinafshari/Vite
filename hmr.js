import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { log } from "console";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "dist");

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  let fullPath = path.join(publicDir, filePath);

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

server.listen(5173, () => {
  console.log("✅ Dev server running at http://localhost:5173");
});
