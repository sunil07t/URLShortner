var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200);
    response.write("hello world!");
    response.end();
    console.log("listening on port 8080");
}).listen(8080);


