
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
   constructor() {
      this.users = [ ];
   }

   addUser (id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
   }

   removeUser (id) {
      // return user that was removed
      var user = this.getUser(id); // Dit is ook goed
      // var user = this.users.filter((user) => user.id === id) [0];
      if (user) {
         this.users = this.users.filter((user) => user.id !== id);
      } // Hierboven staat Users wordt alle id's !== id (muv id)
      return user;
   }

   getUser (id) {
      // Andrew zei dat ik het moest proberen, maar ik was er met mijn hoofd niet bij.
      return this.users.filter((user) => user.id === id) [0];
   }

   getUserList (room) {
      var users = this.users.filter((user) => user.room === room);
      var namesArray = users.map((user) => user.name);
      return namesArray;
   }
}

module.exports ={Users};

// Voorbeeld
// class Person {
//    constructor (name, age) {
//       this.name = name;
//       this.age = age;
//    }
//    getUserDescription () {
//       return `${this.name} is ${this.age} years old.`;
//    }
// }
//
// var me = new Person('Joepppp', 34);
// var description = me.getUserDescription();
// console.log(description);
