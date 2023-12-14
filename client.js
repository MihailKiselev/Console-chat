const readline = require('readline');
const io = require("socket.io-client");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const socket = io('http://localhost:3000');

// Обработка нового пользователя
rl.question('Введите ваше имя: ', (username) => {
  socket.emit('new-user', username);

  // Обработка нового сообщения
  rl.on('line', (message) => {
    socket.emit('send-message', message);
  });
});

// Обработка нового сообщения в чате
socket.on('chat-message', ({ username, message }) => {
  console.log(`${username}: ${message}`);
});

// Обработка подключения нового пользователя
socket.on('user-connected', (username) => {
  console.log(`${username} присоединился к чату`);
});

// Обработка отключения пользователя
socket.on('user-disconnected', (username) => {
  console.log(`${username} покинул чат`);
});