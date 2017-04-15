var http = require('http');

http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, yusuf and serkan and hilal!');
    
}).listen(process.env.PORT || 8080);