const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];
let io;

exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs} = socket.handshake.query;

        setTimeout(() => {
          socket.emit('message', 'Hello Omnistack')
        }, 3000);

        connections.push({
          id: socket.id,
          coordinates: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
          techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connections.coordinates) < 10 && connections.techs.some(items => techs.includes(item));
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
