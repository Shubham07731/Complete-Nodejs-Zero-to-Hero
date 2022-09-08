//Creating a node server

const http = require("http");
const routes = require("./route");
console.log(routes.someText);
const server = http.createServer(routes.handler);
server.listen(3000);

// eventLoop

// keep runing until we register addlistner
