var mongoose = require("mongoose");

var config = require('./utils/config')
const hostname = 'localhost';
const port = 3000;

const server = require('./controller.js');

mongoose.connect(config.database, {useNewUrlParser: true});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});