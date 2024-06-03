import Navbar from "./components/navbar.jsx";
import {useEffect, useRef, useState} from "react";
import ConnectionStatus from "./components/connectionStatus.jsx";


export default function App() {

    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('offline');

    const [struct, setStruct] = useState({
        "BASE": {"ID": 0, "SRC": 0, "DST": 0, "MAG": 0, "TS": "", "TYPE": 0},
        "DATA": {"TARGET": 0, "MV_BGT": 0, "RESULT": 0, "MAGS": [0.0, 0.0]}
    } || {
        "BASE": {"ID": 0, "SRC": 0, "DST": 0, "MAG": 0, "TS": "", "TYPE": 0},
        "DATA": {"MEM_TS": 0, "FAILURE": 0, "EEPROM": 0, "SV": ""}
    });
    const [socket, setSocket] = useState(null);
    const intervalID = useRef(null)
    const unwantedCount = useRef(0)
    // const [ws,setWs]=useState(null);


    const sendBuffer = (buffer, ws) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(buffer);
        } else {
            console.log('WebSocket is not open');
        }
    };
    const handleSendBuffer1 = () => {
        const buffer1 = '00 00 00 6F 00 02 00 00 00 03 00 00 2B 67 00 00 00 00 00 A9 8A C7 00 00 00 04 00 00 00 01 00 00 26 00 00 05 2B 0C 3B 1C 25 05 16 32'

        sendBuffer(buffer1, socket);
    };

    const handleSendBuffer2 = () => {
        const buffer2 = '00 00 00 6F 00 02 00 00 00 03 00 00 2B 67 00 00 00 00 00 A9 8A C7 00 00 00 05 00 00 00 00 65 C5 41 26 00 70 56 45 52 31'
        sendBuffer(buffer2, socket);
    };

    const handleSendBufferSequence = () => {
        const buffer1 = '00 00 00 6F 00 02 00 00 00 03 00 00 2B 67 00 00 00 00 00 A9 8A C7 00 00 00 04 00 00 00 01 00 00 26 00 00 05 2B 0C 3B 1C 25 05 16 32'
        const buffer2 = '00 00 00 6F 00 02 00 00 00 03 00 00 2B 67 00 00 00 00 00 A9 8A C7 00 00 00 05 00 00 00 00 65 C5 41 26 00 70 56 45 52 31'
        const buffer3 = 'sbagliato'

        intervalID.current = setInterval(() => {
            sendBuffer([buffer1, buffer2, buffer3][Math.floor(Math.random() * [buffer1, buffer2, buffer3].length)], socket);
        }, 500)

    }
    const closeConnection = () => {
        socket.close();
    };


    useEffect(() => {

        const reconnect = () => {
            let ws = new WebSocket("ws://localhost:8080", 'tcp')

            ws.onopen = () => {
                console.log("Connected To WS Server")
                setConnectionStatus("online")
            };
            ws.onmessage = (event) => {

                if (event.data === "UNWANTED") {
                    unwantedCount.current=unwantedCount.current+1;
                } else {
                    setStruct(JSON.parse(event.data))
                    setReceivedMessage(event.data);
                }
            };

            ws.onclose = () => {
                console.log('Disconnected from WebSocket server. I will try reconnection in 3 secs...');
                setConnectionStatus("offline")
                clearInterval(intervalID.current);
                setTimeout(() => {
                    reconnect()
                }, 5000)

            };

            setSocket(ws)
        }
        reconnect()
        return () => {
            socket.close();
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);
    return (
        <div className="flex flex-row justify-center mt-20 gap-x-20">
            <div className="flex flex-col">
                <h1 className="mt-0 text-5xl font-medium leading-tight text-primary">
                    Hi,
                </h1>
                <h1 className="mb-20 mt-0 ml-5 text-5xl font-medium leading-tight text-primary">
                    User!
                </h1>
                <button
                    type="button"
                    className="inline-block my-4 rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                    onClick={handleSendBuffer1}
                >
                    Send Buffer 1
                </button>
                <button
                    type="button"
                    className="inline-block my-4 rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                    onClick={handleSendBuffer2}
                >
                    Send Buffer 2
                </button>
                <button
                    type="button"
                    className="inline-block my-4 rounded bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
                    onClick={handleSendBufferSequence}
                >
                    Send Random Buffer
                </button>
                <button
                    type="button"
                    className="inline-block my-4 rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                    onClick={closeConnection}
                >
                    Close Connection
                </button>
                <div className="flex flex-col mt-16 justify-center">
                    <h1 className="text-center">Connection Status</h1>
                    <ConnectionStatus
                        status={connectionStatus}
                    />
                </div>
                <div className="flex flex-col mt-10 justify-center">
                    <h1 className="text-center text-red-500 text-wrap">Number of erroneus packets: {unwantedCount.current}</h1>
                </div>
            </div>
            <Navbar
                struct={struct}
            />
        </div>

    )
        ;
}

