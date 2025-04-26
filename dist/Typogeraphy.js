export default function Typography({ text }) {
  const title = document.createElement("h1");
  title.textContent = text;
  title.style.color = "#333";
  title.style.fontSize = "2em";

  return title;
}
