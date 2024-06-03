// Main declarations
const buffer = require("node:buffer"); // Buffer handler
const {bufferFromString} = require("websocket/lib/utils.js");  // Buffer conversion

// UDP SERVER declaration and creation
const dgram = require('node:dgram');
const serverUDP = dgram.createSocket('udp4');

// First of all I'm getting the size of the buffers because is the only way I know at the momement for discriminating
// a buffer type from another. I know this is not sufficient, but at least is something for now.
const bufferString1='00 00 00 6F 00 02 00 00 00 03 00 00 2B 67 00 00 00 00 00 A9 8A C7 00 00 00 04 00 00 00 01 00 00 26 00 00 05 2B 0C 3B 1C 25 05 16 32'
const bufferString2='00 00 00 6F 00 02 00 00 00 03 00 00 2B 67 00 00 00 00 00 A9 8A C7 00 00 00 05 00 00 00 00 65 C5 41 26 00 70 56 45 52 31'
const arr1=bufferString1.toString().split(" ");
const arr2=bufferString2.toString().split(" ");
const b1 = Buffer.from(arr1);
const b2 = Buffer.from(arr2);
const size1 = b1.length;
const size2 = b2.length;

//Function for parsing the buffer using the given mask
const parseBuffer=(buffer)=> {
    const BASE = {
        ID: buffer.readUInt32BE(0),
        SRC: buffer.readUInt16BE(4),
        DST: buffer.readUInt32BE(6),
        MAG: buffer.readUInt32BE(10),
        TS: buffer.readBigUInt64BE(14),
        TYPE: buffer.readUInt32BE(22),
    };
    if (BASE.TYPE ===4){
        const DATA ={
            TARGET: buffer.readUInt32BE(26),
            MV_BGT: buffer.readUInt32BE(30),
            RESULT: buffer.readUInt16BE(34),
            MAGS: [buffer.readFloatBE(35) , buffer.readFloatBE(39) ],
        }
        return {BASE,DATA}
    }
    else if (BASE.TYPE ===5) {
        const DATA = {
            MEM_TS: buffer.readBigUInt64BE(26),
            FAILURE: buffer.readUInt8(34),
            EEPROM: buffer.readUInt8(35),
            SV: buffer.toString('utf8', 36, 39) // Non mi quadra secondo la definizione del metodo, ma il risultato potrebbe essere corretto. Chiedere perché
        }
        return {BASE,DATA}
    }
    else
        return BASE;
}

// Binding server to a port for listening/sending messages
serverUDP.bind(41235);

// Listening for client
serverUDP.on('listening', () => {
    const address = serverUDP.address();
    console.log(`server is listening ${address.address}:${address.port} - UDP`);
});


// Receiving/Sending the message from/to the client
serverUDP.on('message',function(msg,info){
    console.log('Data received from UDP Client : ' + msg.toString());

    arr=msg.toString().split(" ");
    console.log('Data transformed in string array : ' + arr);

    let buf = Buffer.from(arr);
    console.log('String Array transformed in buffer : ' , buf);

    // buffers like this can be utf8, utf16le or utf16be but node supports only utf8, utf16le.
    // The given endianess is Big Endian, so the buffer must be utf8. Despite all I want to check this and also the size
    // of the buffer in order to implement a more correct checking logic in the future.

    if (buffer.isUtf8(buf) && (buf.length===size1 || buf.length===size2)) {
        let parsed_msg = parseBuffer(buf)
        let JSON_msg = JSON.stringify(parsed_msg, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        console.log('Buffer parsed through "parseBuffer" custom function: ', parsed_msg);
        serverUDP.send(JSON_msg.toString(), info.port, 'localhost', function (error) {
            if (error) {
                console.log('Error occurred while trying to sent back data');
            } else {
                console.log('Parsed data converted (JSON) and sent back to UDP Client', JSON_msg);
            }
        });
    }
    else{
        serverUDP.send("UNWANTED", info.port, 'localhost', function (error) {
            if (error) {
                console.log('Error occurred while trying to sent back data');
            } else {
                console.log('Detected unwanted message');
            }
        });
    }
});

// Catching errors
serverUDP.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    serverUDP.close();
});

