const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config.js');
const http = require('http');

const app = module.exports = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connect', (socket) => { 
  // emit sends to all connected clients
  socket.emit('event', {
    test1: "this data gets sent to clients",
    test2: "get some"
  })
  socket.on('customEvent', (name, cb) => {
    console.log('got a custom event from the front end.')
    // the cb  function sends a message back to the front end in response
    cb('test received')
  })
});


server.listen(config.wsPort);

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14) //this is 14 days
    }
}))

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

//////////Endpoints for the front end




app.listen(config.port, console.log("you are now connected on " + config.port));
