var socket = io();

socket.on('connect', function() {
   console.log('Connected to SERVER');

   socket.emit('createEmail', {
      to: 'jen@example.com',
      text: 'Hey. This is Andrewww.'
   });

   // socket.emit('createMessage', {
   //    from: 'mij@mijn.com',
   //    text: 'En nu naar de server'
   // });
});

socket.on('disconnect', function() {
   console.log('Disconnected from Server');
});

socket.on('newEmail', function(email) {
   console.log('New Email', email);
});

socket.on('newMessage', function(message) {
   console.log('A new Message', message);
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//    from: 'Frank',
//    text: 'Hi there'
// }, function(data) {
//    console.log('Ontvangen', data);
// });

jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
   }, function() {

   });
});
