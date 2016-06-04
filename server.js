var http = require('http');
var fs = require('fs');
var connect = require ('connect');

var express = require('express');

console.log("running...");

/*//404 response
function send404Response(response){
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404! Page not found!");
	response.end();
}

//handle user request

function onRequest(request, response){
	//connecting to homep age
	if (request.method == 'GET' && request.url == '/'){
		response.writeHead(200, {"Content-Type": "text/html"});
		fs.createReadStream('./index.html').pipe(response);
	} else {
		send404Response(response);
	}

}*/

var app = connect();


app.use('/profile', profile);
app.use('/login', login);

function profile(request, response){
	console.log("user profile");
}



function login(request, response){
	console.log("user login");
}
/*app.use(doFirst);
app.use(doSecond);



function doFirst(request, response, next){
	console.log("dofirst");
	next();
}

function doSecond(request, response, next){
	console.log("doSecond");
	next();
}*/

http.createServer(app).listen(8888);
console.log("server is running");

//connect dispatcher


/*if (http.createServer(onRequest).listen(8888))
	console.log("server is running on port 8888");*/