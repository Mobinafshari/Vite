import Button from "./Button.js";

export default function Page() {
  const wrapper = document.createElement("div");
  wrapper.style.width = "100vw";
  wrapper.style.textAlign = "center";
  wrapper.style.height = "70vh";
  wrapper.style.backgroundColor = "#f0f0f0";

  const button = Button({
    onClick: () => alert("Button clicked Bro!"),
    text: "Click me Bro!",
  });

  wrapper.appendChild(button);
  return wrapper;
}
