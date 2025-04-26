import Button from "./Button.js";
import Typography from "./Typogeraphy.js";

export default function App() {
  
  const app = document.createElement("div");
  app.style.textAlign = "center";
  app.style.padding = "20px";
  
  const title = Typography({ text: "Hello World" });
  
  const button = Button({
    text: "Click",
    onClick: () => {
      alert("Button clicked");
    },
  });
  button.id = "my-button";
  // const socket = new WebSocket("ws://localhost:5173");
  // socket.addEventListener("message", async (event) => {
  //   const data = JSON.parse(event.data);
  //   if (data.type === "reload") {
  //     if (data.file.includes("Button.js")) {
  //       const newModule = await import(`./Button.js?t=${Date.now()}`);
  //       const newButton = newModule.default
  //         ? newModule.default({
  //             text: "Click",
  //             onClick: () => {
  //               alert("Button clicked");
  //             },
  //           })
  //         : newModule.App();

  //       const oldButton = document.getElementById("my-button");
  //       oldButton.replaceWith(newButton);
  //       newButton.id = "my-button";
  //     }
  //     if (data.file.includes("Typogeraphy.js")) {
  //       const newModule = await import(`./Typogeraphy.js?t=${Date.now()}`);
  //       const newTitle = newModule.default
  //         ? newModule.default({ text: "Hello World" })
  //         : newModule.App();

  //       const oldTitle = document.querySelector("h1");
  //       oldTitle.replaceWith(newTitle);
  //     }
  //   }
  // });

  app.appendChild(title);
  app.appendChild(button);

  return app;
}
