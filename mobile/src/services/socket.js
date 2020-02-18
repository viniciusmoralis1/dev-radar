import socketio from 'socket.io-client';

const socket = socketio('http://192.168.86.2:2222', {
    autoConnect: false,
});

function connect(latitude, longitude, techs){
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  }
  socket.connect();

  socket.on('message', text => {
    console.log(text);
  })
}

function disconnect(){
    if(socket.connect){
        socket.disconnect();
    }
};

export {
    connect,
    disconnect
};
