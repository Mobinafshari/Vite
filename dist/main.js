const root = document.getElementById('root');
root.innerHTML = `<h1>Hello Friends</h1>`;

const socket = new WebSocket('ws://localhost:5173')

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)

  if (data.type === 'reload') {
    console.log('[HMR] Reloading...')
    location.reload()
  }
})