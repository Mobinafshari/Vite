import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5173;

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

app.use(express.static(__dirname));

app.listen(PORT, () =>
  console.log(`App is Running On the http://localhost:${PORT}`)
);
