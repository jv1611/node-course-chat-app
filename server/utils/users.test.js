const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
   var users;
   beforeEach(() => {
      users = new Users();
      users.users = [{
         id: '1',
         name: 'Mike',
         room: 'Kamer EEN'
      }, {
         id: '2',
         name: 'Klaas',
         room: 'Kamer 22'
      }, {
         id: '3',
         name: 'Jeroen',
         room: 'Kamer EEN'
      }];
   });

   it('Should add new user', () => {
      var users = new Users();
      var user = {
         id: '132',
         name: 'TestKlaas',
         room: 'Kleine kamer'
      };
      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
   });

   it('Should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);
      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
   });

   it('Should not remove user', () => {
      var userId = '99';
      var user = users.removeUser(userId);

      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
   });

   it('Should find user', () => {
      var userId = '2';
      var user = users.getUser(userId);

      expect(user.id).toBe(userId);

   });

   it('Should not find user', () => {

   });

   it('Should return names for Kamer EEN', () => {
      var userList = users.getUserList('Kamer EEN');

      expect(userList).toEqual(['Mike', 'Jeroen']);
   });

   it('Should return names for Kamer 22', () => {
      var userList = users.getUserList('Kamer 22');

      expect(userList).toEqual(['Klaas']);
   });
});
