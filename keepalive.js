var http = require('http');

const configs = require('./Commands/Json/commandConfigs.json')
const crystal = require('./Commands/Json/crystalIdolInfo.json')
const mastermind = require('./Commands/Json/mastermindIdolInfo.json')
const grid = require('./Commands/Json/gridIdolInfo.json')
http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);