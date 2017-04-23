
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
app.get('/', function (req, res) {
    if (req.query['hub.verify_token'] === 'EAAGWpgIySIABACyoZCRqPLKZAJkQEbnZAYGiVEPNry8kasZB6IFOhXP0O6jHQZBMvZCFqgu8VuK3X5QRgVk8ud19XS81ofNRZCn6r9OsJZBt8gac2hqKGbd1TGFZAV9ciTArUNykNrmBznz2ZAZA8WiX3bCFcheIFb4XqpqjZCckND42rAZDZD') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token!!!')
    }
})


/*http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, yusuf and serkan bekir and hilal!');
    
}).listen(process.env.PORT || 8080);*/

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
