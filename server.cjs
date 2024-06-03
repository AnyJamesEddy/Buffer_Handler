// Main declarations
var http = require('http'); // HTTP Application Protocol declaration
var WebSocketServer = require('websocket').server; // Websocket Server handler

const dgram = require('node:dgram'); // UDP Socket Handler
const client = dgram.createSocket('udp4');


// WS SERVER
var serverHTTP = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

serverHTTP.listen(8080, function() {
    console.log('Server is listening on port 8080 - HTTP (WS) Server');
});

wsServer = new WebSocketServer({
    httpServer: serverHTTP,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) {

    var connection = request.accept('tcp', request.origin);
    console.log('Connection accepted.');
    connection.on('message', function(message) {
        console.log(message)
        if (message.type === 'utf8') {
            console.log('Now I will try to bridge the message')
            // Bridging the message to UDP server
            client.send(message.utf8Data, 41235, 'localhost', error => {
                if (error) {
                    console.log(error)
                    client.close()
                } else {
                    console.log('Data sent !!!')
                }
            })
            // connection.sendUTF("Ciao, Sono il Server");
        }
        // else if (message.type === 'binary') {
        //     console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        //     connection.sendBytes(message.binaryData);
        // }
    });
    client.on('message', (msg, info) => {
        console.log('Data received from UDP Server : ' + msg)
        connection.send(msg.toString());
    })
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

// UDP Socket Client


// UDP Socket Client






