import App from "./App.js";

const root = document.getElementById("root");
const app = App();
root.appendChild(app);

const socket = new WebSocket("ws://localhost:5173");

socket.addEventListener("message", async (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "reload") {
    console.log("[HMR] Reloading module...", data.file.split("dist\\"));

    // const newButton = await import(`./Button.js?t=${Date.now()}`);
    const newModule = await import(`./App.js?t=${Date.now()}`);
    const newApp = newModule.default ? newModule.default() : newModule.App();

    root.innerHTML = "";
    root.appendChild(newApp);
    // root.appendChild(newButton.default());
  }
});
