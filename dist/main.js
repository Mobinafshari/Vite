import App from './App.js';

const root = document.getElementById('root');
const app = App();
root.appendChild(app);

const socket = new WebSocket('ws://localhost:5173')

socket.addEventListener('message', async(event) => {
  const data = JSON.parse(event.data)

  if (data.type === 'reload') {
    console.log('[HMR] Reloading module...');

    // Remove old app
    root.innerHTML = '';

    // Import the updated App.js (with cache busting)
    const newModule = await import(`./App.js?t=${Date.now()}`);
    const newApp = newModule.default ? newModule.default() : newModule.App(); // Handle default export

    // Re-render
    root.appendChild(newApp);
  }
})