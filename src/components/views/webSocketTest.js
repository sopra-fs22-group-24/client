import { Button } from 'components/ui/Button';
import React, { useState } from 'react';
import SocketConnection from 'helpers/socketConnection';
import FloForm from 'components/ui/FloForm';
const SOCKET_URL = 'http://localhost:8080/gs-guide-websocket';

const WebSocketTest = () => {

    // Don't use state for the lobby and gameId or else the whole component will reload and
    // we would have to reconnect the socket. 
    var lobbyId = null;
    var gameId = null;
    var cards = null;

    const receiveMessageCallback = (response) => {
        console.log("users/queue/message")
        console.log(response)
    }

    const receiveErrorCallback = (response) => {
        console.log("users/queue/error")
        console.log(response)
    }
    

    // ----------------- LOBBY --------------------
    const createLobby = () => {
        socket.send("/app/createLobby",{})
    }
    
    const joinLobby = (lobbyId) => {
        //socket.send("/app/anotherTest")
        socket.send("/app/joinLobby", {"lobbyId": lobbyId} )
    }

    const joinLobbyCallback = (response) => {
        console.log("/users/messages/joinLobby")
        console.log(response)
        // Don't use state or else the whole component will reload and you have to reconnect
        lobbyId = response.lobbyId;
        // We are now connected to the lobby
        // Let us now subscribe to the lobby channels
        socket.subscribe("/lobby/"+lobbyId+"/userJoined", userJoinedCallback)
        socket.subscribe("/lobby/"+lobbyId+"/startGame", startGameCallback)

        socket.subscribe("/users/queue/error", receiveErrorCallback)

    }

    const userJoinedCallback = (response) => {
        console.log("/lobby/"+lobbyId+"/userJoined")
        console.log(response)
    }

    
    // -------------------------- GAME ------------------------------
    
    const startGame = () => {
        socket.send("/app/game", {"lobbyId": lobbyId})
    }
    
    const initGame = () => {
        socket.send("/app/game/"+gameId+"/init")
    }

    const playCard = (index) => {
        socket.send("/app/game/"+gameId+"/playCard", cards[index])
    }

    const startGameCallback = (response) => {
        console.log("/lobby/"+lobbyId+"/startGame")
        console.log(response)
        // Don't use state or else the whole component will reload and you have to reconnect
        gameId = response.gameId
        // We are now connected to the game
        // Let us now subscribe to the game channels
        // public channels
        socket.subscribe("/game/"+gameId+"/topMostCard", topMostCardCallback)
        socket.subscribe("/game/"+gameId+"/playerTurn", playerTurnCallback)
        socket.subscribe("/game/"+gameId+"/playerHasNCards", playerHasNCardsCallback)
        // privateChannel
        socket.subscribe("/users/queue/"+gameId+"/cards", playerCardsCallback)

        
    }

    const topMostCardCallback = (response) => {
        console.log("/game/"+gameId+"/topMostCard")
        console.log(response);
    }

    const playerTurnCallback = (response) => {
        console.log("/game/"+gameId+"/playerTurn")
        console.log(response);
    }

    const playerHasNCardsCallback = (response) => {
        console.log("/game/"+gameId+"/playerHasNCards")
        console.log(response);
    }

    const playerCardsCallback = (response) => {
        console.log("/users/queue/"+gameId+"/cards")
        console.log(response)
        cards = response;
    }
    // ------------------------ MAIN -----------------------------
    // setup socket
    var socket = new SocketConnection()
    // setup subscriptions

    socket.subscribe("/users/queue/joinLobby", joinLobbyCallback)

    // connect
    socket.connect(localStorage.getItem('token'));
    

    return (
            <div>
            
            <Button onClick={() => createLobby()}>create Lobby</Button>
            <FloForm callback={joinLobby} placeholder="Enter Lobby Id" buttonMessage="Join Lobby"/>
            <div>
                <Button onClick={() => startGame()}>Start Game</Button>
            </div>
            <div>
                <Button onClick={() => initGame()}> Initialise Game (Displays topMostCard, playerTurn and cards)</Button>
            </div>
            <FloForm callback={playCard} placeHolder="Enter card index" buttonMessage="play Card by Index" />
        </div>
  );
}

export default WebSocketTest;