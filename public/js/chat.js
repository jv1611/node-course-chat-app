var socket = io();

function scrollToBottom () {
   // Selectors
   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child');
   // Heights
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();
   if (clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
   }
};

socket.on('connect', function() {
   // console.log('Connected to SERVER');
   var params = jQuery.deparam(window.location.search);

   socket.emit('join', params, function (err) {
      if(err) {
         alert(err);
         window.location.href = '/';
      } else {
         console.log('No error');
      }
   });

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

socket.on('updateUserList', function(users) {
   // console.log('Users list', users);
   var ol = jQuery('<ol></ol>');

   users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
   });
   jQuery('#users').html(ol); // Toevoeging aan DOM
   // #users komt uit chat.html <div id=users></div>
});

socket.on('newEmail', function(email) {
   console.log('New Email', email);
});

socket.on('newMessage', function(message) {
   var formattedTime = moment(message.createdAt).format('HH:mm');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
   });

   jQuery('#messages').append(html);
   scrollToBottom();
   // oud
   // var formattedTime = moment(message.createdAt).format('HH:mm');
   // var li = jQuery('<li></li>');
   // li.text(`${message.from} ${formattedTime}: ${message.text}`);
   //
   // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//    from: 'Frank',
//    text: 'Hi there'
// }, function(data) {
//    console.log('Ontvangen', data);
// });

socket.on('newLocationMessage', function(message) {
   var formattedTime = moment(message.createdAt).format('HH:mm');
   var template = jQuery('#location-message-template').html();
   var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
   });
   jQuery('#messages').append(html);
   scrollToBottom();
   // var li = jQuery('<li></li>');
   // var a = jQuery('<a target="_blank">My current location</a>');
   // li.text(`${message.from} ${formattedTime}: `);
   // a.attr('href', message.url);
   // li.append(a);
   // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   var messageTextbox = jQuery('[name=message]');

   socket.emit('createMessage', {
      text: messageTextbox.val()
   }, function() {
      messageTextbox.val(' ')
   });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
   if(!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
   }

   locationButton.attr('disabled', 'disabled').text('Sending location ...');

   navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
   }, function () {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location');
   });
});
