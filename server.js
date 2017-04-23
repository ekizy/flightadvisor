
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

var day=""
var month=""
var year=""
var origin=""
var destination=""
var passengerNumber=""
var firstmessage=0;



app.get('/', function (req, res) {
    if (req.query['hub.verify_token'] === 'EAAGWpgIySIABACyoZCRqPLKZAJkQEbnZAYGiVEPNry8kasZB6IFOhXP0O6jHQZBMvZCFqgu8VuK3X5QRgVk8ud19XS81ofNRZCn6r9OsJZBt8gac2hqKGbd1TGFZAV9ciTArUNykNrmBznz2ZAZA8WiX3bCFcheIFb4XqpqjZCckND42rAZDZD') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token!!!')
    }
})

app.post('/', function (req, res) {
    var data = req.body;

    if (data.object === 'page') {
        data.entry.forEach(function(entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;

            // Iterate over each messaging event
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    receivedMessage(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });
        res.sendStatus(200);
    }
});

function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        if(messageText==="#reset") {
            origin=""
            destination=""
            day=""
            year=""
            month="0"
            passengerNumber=""
            firstmessage=0
            sendTextMessage(senderID,"Inputs are reset.")
        }
        if(day==="" && month==="" && year ===""&&origin ===""&& destination===""&&passengerNumber===""&&firstmessage===0)
        {
            sendTextMessage(senderID,"Hi,Please enter the destination")
            firstmessage=1
        }
        else if (day==="" && month==="" && year ===""&&origin ===""&& destination===""&&passengerNumber===""){
            destination=messageText
            sendTextMessage(senderID,"Ok.Please enter the origin")
        }
        else if (day==="" && month==="" && year ===""&&origin ===""&&passengerNumber===""){
            origin=messageText
            sendTextMessage(senderID,"Ok.Please enter the year")
        }
        else if (day==="" && month==="" && year ===""&&passengerNumber===""){
            year=messageText
            sendTextMessage(senderID,"Ok.Please enter the month")
        }
        else if (day===""&& month==="" &&passengerNumber===""){
            month=messageText
            sendTextMessage(senderID,"Ok.Please enter the day")
        }
        else if (day===""&&passengerNumber===""){
            day=messageText
            sendTextMessage(senderID,"Ok. Now please enther the number of passengers")
        }
        else if (passengerNumber==="")
        {
            passengerNumber=messageText
            sendTextMessage(senderID,"Thanks for the inputs. We are searching for flights")
            //skyscanner işini yap.
            origin=""
            destination=""
            day=""
            year=""
            month="0"
            passengerNumber=""
            firstmessage=0
        }


        // If we receive a text message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        /*switch (messageText) {
            case 'how are you':
                sendTextMessage(senderID,"fine and you?");
                break;
            case 'hi':
                sendTextMessage(senderID,"Hi there!!");
                break;

            default:
                sendTextMessage(senderID, messageText);
        }*/
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}


function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: 'EAAGWpgIySIABAM0DLkzN0YFkpYYRZBPLmFYZAEKcJ1OcsxMX3rzfLdeZAYaC9XJ1ej2bZBQA26D60u18mEywZCFJZCx4FGJxWQAbDDlVYZClo3H1xqHrKwtZCKPR7UG1KVP4pSZABAap6WSpPyNhlDEhxuMpH2tAZBhA5FxJgQExhYYQZDZD' },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
}


/*http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, yusuf and serkan bekir and hilal!');
    
}).listen(process.env.PORT || 8080);*/

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
