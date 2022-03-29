import { Button } from 'components/ui/Button';
import React, { useState } from 'react';
import SocketConnection from 'helpers/socketConnection';
const SOCKET_URL = 'http://localhost:8080/gs-guide-websocket';

const WebSocketTest = () => {
    const [message, setMessage] = useState('You server message here.');
    const [name, setName] = useState(null)
    
    const sendData = () => {
        console.log(name)
        socket.send("/app/hello", {"name": name})
    }
    
    const displayResponse = (response) => {
        console.log(response)
        setMessage(`Server says: ${response}`)
    }
    var socket = new SocketConnection()
    socket.subscribe("/topic/greetings", displayResponse)
    socket.connect()
    return (
            <div>
            <div>{message}</div>
            <input type="text" id="ladida" placeholder="Enter name" onChange={(input) => setName(input.target.value)} />
            <Button onClick={() => sendData()}>Send</Button>
        </div>
  );
}

export default WebSocketTest;