import App from './App.js';

const root = document.getElementById('root');
const app = App();
root.appendChild(app);

const socket = new WebSocket('ws://localhost:5173')

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)

  if (data.type === 'reload') {
    console.log('[HMR] Reloading...')
    location.reload()
  }
})