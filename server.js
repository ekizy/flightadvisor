var http = require('http');

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'EAAaIdyjALlgBAGP83GpOMB8PCPxqqq1fsXyExWd69K5ug5Yh6muvD5FV8H3Rsam8AvuUETNAUbNXzDpPu9z' +
        'Co4z4OlIzlXj95qehoR5OF00aT0qHekHk5j6VKahjZC3bvnFf8HRo3KKTPhrsGc8jEI5e0ZCzXLGiMER8T6ngZDZD') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
})

http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, yusuf and serkan and hilal!');
    
}).listen(process.env.PORT || 8080);