require ('./config/config');
const path =  require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); // oude methode = omslachtig
console.log(publicPath); // nieuwe methode icm path.join

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected');

   socket.on('disconnect', () => {
      console.log('Client disconnected');
   });
});

// app.get('/', (req, res) => {
//    res.render('index.html');
//    console.log('Zo zou het moeten werken');
// });

server.listen(port, () => {
   console.log(`Server has started on port ${port}.`);
});

// module.exports = {app};
