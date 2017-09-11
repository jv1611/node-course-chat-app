const expect = require('expect');
// const request = require('supertest');
//
// const {app} = require('./../server');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
   it('Should generate correct message object', () => {
      // store res in variable
      // var text = 'Hoe krijg ik dit aan de praat';
      var from = 'AndreJo';
      var text = 'Het wordt nog wat';
      var message = generateMessage(from, text);

      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, text});
      // assert from match
      // assert text match
      // assert createdAt is number
   });
});

describe('generateLocationMessage', () => {
   it('Should generate correct location object', () => {
      var from= 'TestKlaas';
      var latitude = 5;
      var longitude = 5;
      var url = 'https://www.google.com/maps?q=5, 5';
      var newLocation = generateLocationMessage(from, latitude, longitude);

      expect(newLocation.createdAt).toBeA('number');
      expect(newLocation).toInclude({from,url});
   });
});
