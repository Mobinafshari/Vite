console.log('Hello World');
const root = document.getElementById('root');
root.innerHTML = `<h1>Hello Friend</h1>`;


const socket = new WebSocket('ws://localhost:5173')

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    root.innerHTML = `<h2>${data.message}</h2>`;
})
