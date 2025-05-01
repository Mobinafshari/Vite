import { createHMRRuntime } from "./hmrRuntime.js";
import App from "./App.js";

const root = document.getElementById("root");
const app = App();
root.appendChild(app);

const socket = new WebSocket("ws://localhost:5173");
export const hmrRuntime = createHMRRuntime();

socket.addEventListener("message", async (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "reload") {
    const reImportPath = data.file[0];
    const mustChangeFiles = data.file[1].dependents;
    console.log("[HMR] Reloading module...", reImportPath, mustChangeFiles);
    hmrRuntime.notify(reImportPath);
  }
});
