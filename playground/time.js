// Tijd 0 = 01-01-1970 00:00:00 | -1 = 1969

const moment = require('moment');

var createdAt = 83612342;
var date = moment(createdAt);

console.log('De tijd is: ');
// console.log(date.format('DD MMM YYYY HH:MM:SS'));
console.log(date.format('DD MMM YYYY HH:mm:ss'));
console.log(date.format('DD MMM YYYY H:mm:ss'));
console.log(date.format('DD MMM YYYY h:mm:ss'));
console.log(date.format('DD MMM YYYY k:mm:ss'));
