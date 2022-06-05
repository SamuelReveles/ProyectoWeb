require('dotenv').config();

//Server
const Server = require('./models/server');

//Instancia del servidor
const server = new Server();
server.listen();