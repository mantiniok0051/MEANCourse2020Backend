'use strict'//Activar modo estricto y funcionalidades ECMA-SCRIPT 5-6

const app = require('./backend/app');
const debug = require('debug')('node-angular'); // DEBUG:
const http= require('http');
//const port = ;

//Proceso para identificar el puerto empleado en la url o asignar un valor
const normalizePort =  val =>{
  var port = parseInt(val, 10);

  if(isNaN(port)){
    //named pipe
    return val;
  }

  if (port >=   0) {
    //port number
    return port;
  }

  return false;
};

// Proceso para manejar error durante arranque del server
const onError = error =>{
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'pipe ' + port : 'port' + port;
  switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
      break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        break;
    default:
    throw error;

  }
};

//Proceso para ejecutar en cado de inicializar el server debidamente
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port' + port;
  debug('Listening on ' + bind);
};

const port = normalizePort(process.env.PORT || process.env.DEFAULT_PORT);
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port, process.env.DEFAULT_IP);
