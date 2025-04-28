import App from "./App.js";
import Page from "./Page.js";

const root = document.getElementById("root");
const app = App();
const page = Page();
root.appendChild(app);
root.appendChild(page);

const socket = new WebSocket("ws://localhost:5173");

socket.addEventListener("message", async (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "reload") {
    const reImportPath = data.file[0];
    const mustChangeFiles = data.file[1].dependents;
    console.log("[HMR] Reloading module...", reImportPath, mustChangeFiles);
    const newModule = await import(`./App.js?t=${Date.now()}`);
    const newApp = newModule.default ? newModule.default() : newModule.App();

    // root.replaceWith(newApp);
  }
});
