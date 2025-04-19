export default function Button({ text = 'Click me', onClick }) {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.padding = '10px 20px';
  button.style.borderRadius = '5px';
  button.style.backgroundColor = '#4CAF50';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.fontSize = '16px';
  
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
}
