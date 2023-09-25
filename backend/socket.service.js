// socket.service.js
const socketIo = require('socket.io');

function initializeSocket(server) {
  const io = socketIo(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // You can add socket.io event handlers here
    // For example, to handle a book created event:
    socket.on('book created', (book) => {
      console.log('Book Created:', book);
      io.emit('book created', book);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
}

module.exports = { initializeSocket };
