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

    const startGame = () => {
        socket.send("/app/joinLobby")
    }

    const randomMessages = (response) => {
        console.log("rand messages")
        console.log(response)
    }
    var socket = new SocketConnection()
    //socket.subscribe("/topic/greetings", displayResponse)
    socket.subscribe("/topic/messages", randomMessages)

    
    socket.connect(localStorage.getItem('token'));
    

    return (
            <div>
            <div>{message}</div>
            <input type="text" id="ladida" placeholder="Enter name" onChange={(input) => setName(input.target.value)} />
            <Button onClick={() => sendData()}>Send</Button>
            <Button onClick={() => startGame()}>Start Game</Button>
        </div>
  );
}

export default WebSocketTest;