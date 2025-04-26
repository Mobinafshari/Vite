import Button from "./Button.js";

export default function App() {
  const socket = new WebSocket("ws://localhost:5173");

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
  button.id = "my-button";
  socket.addEventListener("message", async (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "reload") {
      const newModule = await import(`./Button.js?t=${Date.now()}`);
      const newButton = newModule.default
        ? newModule.default({
            text: "Click",
            onClick: () => {
              alert("Button clicked");
            },
          })
        : newModule.App();

      const oldButton = document.getElementById("my-button");
      console.log("old", oldButton);
      oldButton.replaceWith(newButton);
      return;
    }
  });

  app.appendChild(title);
  app.appendChild(button);

  return app;
}
