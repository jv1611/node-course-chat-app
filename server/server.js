require ('./config/config');
const path =  require('path');
const express = require('express');
const port = process.env.PORT;

const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); // oude methode = omslachtig
console.log(publicPath); // nieuwe methode icm path.join

var app = express();

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//    res.render('index.html');
//    console.log('Zo zou het moeten werken');
// });

app.listen(port, () => {
   console.log(`Server has started on port ${port}.`);
});

// module.exports = {app};
