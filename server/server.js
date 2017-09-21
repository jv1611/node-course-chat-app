require ('./config/config');
const path =  require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); // oude methode = omslachtig
console.log(publicPath); // nieuwe methode icm path.join

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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

      // { OUD
      //    from: 'Admin',
      //    text: 'A new User has joined the chat-app',
      //    createdAt: new Date().getTime()
      // });
   // });

   socket.on('join', (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.room)) {
         return callback('Name and room name are required!');
      }

      socket.join(params.room);
      users.removeUser(socket.id); // hiermee wordt de users verwijderd uit vorige rooms
      users.addUser(socket.id, params.name, params.room);
      // socket.leave('The office Fans');

      // io.emit --> io.to('The office Fans').emit
      // socket.broadcast.emit --> socket.broadcast.to('The office Fans').emit
      // socket.emit

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat-app ${params.name}.`));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} had joined the room`));

      callback();
   });

   socket.on('createMessage', (message, callback) => {
      // console.log('createMessage', message);
      var user = users.getUser(socket.id); // getUser is functie uit user.js
      if(user && isRealString(message.text)) {
         io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      }
      // callback('This is from the Server, Jo.');
      callback();
      // socket.broadcast.emit('newMessage',{
      //    from: message.from,
      //    text: message.text,
      //    createdAt: new Date().getTime()
      // });
   });

   socket.on('createLocationMessage', (coords) => {
      // io.emit('newMessage', generateMessage('Adminn', `${coords.latitude}, ${coords.longitude}`));
      var user = users.getUser(socket.id);
      if(user) {
         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      }      
   });


   socket.on('disconnect', () => {
      // console.log('Client disconnected');
      var user = users.removeUser(socket.id);
      if (user) {
         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
         io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
      }
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
