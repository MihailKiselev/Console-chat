const readline = require('readline');
const io = require("socket.io-client");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const socket = io('http://localhost:3000');

rl.question('Введите ваше имя: ', (username) => {
  socket.emit('new-user', username);

  rl.on('line', (message) => {
    socket.emit('send-message', message);
  });
});

socket.on('chat-message', ({ username, message }) => {
  console.log(`${username}: ${message}`);
});

socket.on('user-connected', (username) => {
  console.log(`${username} присоединился к чату`);
});

socket.on('user-disconnected', (username) => {
  console.log(`${username} покинул чат`);
});