require ('./config/config');
const path =  require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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

   socket.emit('newEmail', {
      from: 'mike@example.com',
      text: 'Hallo daar lezer',
      createAt: 84359
   });

   socket.on('createEmail', (newEmail) => {
      console.log('CreateEmail', newEmail);
   });

   // socket.emit('newMessage', {
   //    from: 'ikke@mail.com',
   //    text: 'Altijd maar die tests',
   //    createdAt: 5646546
   // });

   // socket.on('newUser', (message) => {
   //    console.log('***********');
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat-app'));

      socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
      // { OUD
      //    from: 'Admin',
      //    text: 'A new User has joined the chat-app',
      //    createdAt: new Date().getTime()
      // });
   // });

   socket.on('createMessage', (message, callback) => {
      console.log('createMessage', message);
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback('This is from the Server, Jo.');
      // socket.broadcast.emit('newMessage',{
      //    from: message.from,
      //    text: message.text,
      //    createdAt: new Date().getTime()
      // });
   });


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
