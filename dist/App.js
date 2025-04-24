import Button from "./Button.js";

export default function App() {
  const app = document.createElement("div");
  app.style.textAlign = "center";
  app.style.padding = "20px";

  const title = document.createElement("h1");
  title.textContent = "My App!";
  title.style.color = "#333";

  const button = Button({
    text: "Click",
    onClick: () => {
      alert("Button clicked");
    },
  });
  const socket = new WebSocket("ws://localhost:5173");

  socket.addEventListener("message", async (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "reload") {
      console.log("[HMR] Reloading module...", data.file.split("dist\\"));

      const newButton = await import(`./Button.js?t=${Date.now()}`);
      app.innerHTML = "";
      app.appendChild(
        newButton.default({
          text: "Click",
          onClick: () => {
            alert("Button clicked");
          },
        })
      );
    }
  });
  app.appendChild(title);
  app.appendChild(button);

  return app;
}
