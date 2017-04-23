
//var http = require('http');


const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'EAAaIdyjALlgBAGP83GpOMB8PCPxqqq1fsXyExWd69K5ug5Yh6muvD5FV8H3Rsam8AvuUETNAUbNXzDpPu9zCo4z4OlIzlXj95qehoR5OF00aT0qHekHk5j6VKahjZC3bvnFf8HRo3KKTPhrsGc8jEI5e0ZCzXLGiMER8T6ngZDZD') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
})

/*http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, yusuf and serkan bekir and hilal!');
    
}).listen(process.env.PORT || 8080);*/

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})