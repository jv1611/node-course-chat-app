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

socket.on('newMessage', function(nME) {
   console.log('A new Message', nME);
});
