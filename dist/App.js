import Button from './Button.js';

export default function App() {
  const app = document.createElement('div');
  app.style.textAlign = 'center';
  app.style.padding = '20px';
  
  const title = document.createElement('h1');
  title.textContent = 'My App';
  title.style.color = '#333';
  
  const button = Button({
    text: 'Click Me!',
    onClick: () => {
      alert('Button clicked');
    }
  });
  
  app.appendChild(title);
  app.appendChild(button);
  
  return app;
}

