import { Button } from 'components/ui/Button';
import React, { useEffect, useState } from 'react';
import SocketConnection from 'helpers/socketConnection';
import FloForm from 'components/ui/FloForm';
import socket from 'helpers/socketConnection'

const SOCKET_URL = 'http://localhost:8080/gs-guide-websocket';

const WebSocketTestWithStates = () => {

    // Don't use state for the lobby and gameId or else the whole component will reload and
    // we would have to reconnect the socket. 
    const [lobbyId, setLobbyId] = useState(null)
    const [gameId, setGameId] = useState(null)
    const [cards, setCards] = useState([])
    const [topMostCard, setTopMostCard] = useState([])
    const [playerTurn, setPlayerTurn] = useState(null)
    const [players, setPlayers] = useState([sessionStorage.getItem("username")])
    const [cardToPlay, setCardToPlay] = useState(null)
    var ctp = null;
    const receiveMessageCallback = (response) => {
        console.log("users/queue/message")
        console.log(response)
    }

    const receiveErrorCallback = async (response) => {
        console.log("users/queue/error")
        console.log(response)

    }
    
    const printCards = () => {
        console.log(cards)
    }

    // ----------------- LOBBY --------------------
    const createLobby = () => {
        socket.send("/app/createLobby",{})
    }
    
    const joinLobby = (lobbyId) => {
        //socket.send("/app/anotherTest")
        socket.send("/app/lobby/"+lobbyId+"/joinLobby", {} )
    }

    const leaveLobby = () => {
        socket.send("/app/lobby/"+lobbyId+"/leaveLobby", {});
    }

    const joinLobbyCallback = (response) => {
        console.log("/users/messages/joinLobby")
        console.log(response)
        // Don't use state or else the whole component will reload and you have to reconnect
        setLobbyId(response.lobbyId)
    }

    const userJoinedCallback = (response) => {
        console.log("/lobby/"+lobbyId+"/userJoined")
        console.log(response)
        setPlayers(oldPlayers => [oldPlayers, response.username])
    }

    const userLeftCallback = (response) => {
        console.log("/lobby/"+lobbyId+"/userLeft");
        console.log(response)
        if(response.username === sessionStorage.getItem("username")) {
            socket.unsubscribe("/lobby/"+lobbyId+"/userJoined")
            socket.unsubscribe("/lobby/"+lobbyId+"/userLeft")
            socket.unsubscribe("/lobby/"+lobbyId+"/startGame")
            socket.unsubscribe("/users/queue/error")        
        } else {
            setPlayers(players.filter(function(player) { 
                return player !== response.username 
            }));
        }
    }

    
    // -------------------------- GAME ------------------------------
    
    const startGame = () => {
        socket.send("/app/game", {"lobbyId": lobbyId})
    }
    
    const initGame = () => {
        socket.send("/app/game/"+gameId+"/init")
    }

    const playCard = async (index) => {
 
        var payload = {"card": cards[index], "user":null, "uno": null}

        socket.send("/app/game/"+gameId+"/playCard", payload)
        console.log(cards)


    }

    const drawCards = () => {
        socket.send("/app/game/"+gameId+"/drawCard")
    }

    const callOutPlayer = (username) => {
        socket.send("/app/game/"+gameId+"/callOut",{"username": username })
    }

    const startGameCallback = (response) => {
        console.log("/lobby/"+lobbyId+"/startGame")
        console.log(response)
        // Don't use state or else the whole component will reload and you have to reconnect
        setGameId(response.gameId)
        sessionStorage.setItem("testGameId", gameId)
        // We are now connected to the game
        // Let us now subscribe to the game channels
        // public channels

    }

    const topMostCardCallback = (response) => {
        console.log("/game/"+gameId+"/topMostCard")
        console.log(response);
        setTopMostCard([response])

    }

    const playerTurnCallback = (response) => {
        console.log("/game/"+gameId+"/playerTurn")
        console.log(response);
        setPlayerTurn(response.username)

    }

    const playerHasNCardsCallback = (response) => {
        console.log("/game/"+gameId+"/playerHasNCards")
        console.log(response);
    }

    const playerCardsCallback = (response) => {
        console.log("/users/queue/"+gameId+"/cards")
        console.log(response)
        setCards(oldCards => [...oldCards, ...response[0]])


    }

    const playerCardsDrawnCallback = (response) => {
        console.log("/users/queue/"+gameId+"/cardsDrawn")
        console.log(response)
        var stateCopy = cards
        setCards(oldCards => oldCards.concat(response))
        
    }

    const calledOutCallback = (response) => {
        console.log("/game/"+gameId+"/calledOut")
        console.log(response)
    }
    
    const playedCardCallback = (response) => {
        console.log("/game/"+gameId+"/playedCard")
        setCards(response)
 

    }

    // -------------------------State ----------------------------
    const printStates = () => {
        console.log(`lobbyId: ${lobbyId}`)
        console.log(`gameId: ${gameId}`)
        console.log(`nCards: ${cards.length}`)
        console.log(`cards:`)
        for(var i=0; i<cards.length; i++) {
            console.log(i)
            console.log(cards[i])
        } 
        console.log(`topMostCard`)
        for(var i=0; i<topMostCard.length;i++) {
            console.log(topMostCard[i])
        }
        console.log(`players: ${players}`)
        console.log(`playerTurn: ${playerTurn}`)
        console.log(`cardToPlay: ${cardToPlay}`)
    }
    // ------------------------ MAIN -----------------------------
    // setup socket
    // setup subscriptions

    useEffect(() => {
        socket = new SocketConnection()
        socket.subscribe("/users/queue/joinLobby", joinLobbyCallback)
        // connect
        socket.connect(sessionStorage.getItem('token'));
        }, [])
    useEffect(() => {
        if (lobbyId == null) {
            return;
        }
        console.log(socket)
        socket.subscribe("/lobby/"+lobbyId+"/userJoined", userJoinedCallback)
        socket.subscribe("/lobby/"+lobbyId+"/userLeft", userLeftCallback)
        socket.subscribe("/lobby/"+lobbyId+"/startGame", startGameCallback)
        socket.subscribe("/users/queue/error", receiveErrorCallback)
        }, [lobbyId])
    
    useEffect(() => {
        if(gameId != null) {
            socket.subscribe("/game/"+gameId+"/topMostCard", topMostCardCallback)
            socket.subscribe("/game/"+gameId+"/playerTurn", playerTurnCallback)
            socket.subscribe("/game/"+gameId+"/playerHasNCards", playerHasNCardsCallback)
            socket.subscribe("/game/"+gameId+"/calledOut", calledOutCallback)
            
            // privateChannel
            socket.subscribe("/users/queue/"+gameId+"/cards", playerCardsCallback)
            socket.subscribe("/users/queue/"+gameId+"/cardsDrawn", playerCardsDrawnCallback)
            socket.subscribe("/users/queue/"+gameId+"/playedCard", playedCardCallback)
        }
        }, [gameId])

    return (
            <div>
            
            <Button onClick={() => createLobby()}>create Lobby</Button>
            <FloForm callback={joinLobby} placeholder="Enter Lobby Id" buttonMessage="Join Lobby"/>
            <div>
                <Button onClick={() => leaveLobby()}>Leave Lobby</Button>
            </div>
            <div>
                <Button onClick={() => startGame()}>Start Game</Button>
            </div>
            <div>
                <Button onClick={() => initGame()}> Initialise Game (Displays topMostCard, playerTurn and cards)</Button>
            </div>
            <FloForm callback={playCard} placeholder="Enter card index" buttonMessage="play Card by Index" />
            <div>
                <Button onClick={() => drawCards()}>Draw Cards (0-12) </Button>
            </div>
            <div>
               <Button onClick={() => printCards()}>Print cards stored locally </Button>
            </div>
            <FloForm callback={callOutPlayer} placeholder="Enter username to call out" buttonMessage="Call out player" />
            <div>
                <Button onClick={() => printStates()}>Print States</Button>
            </div>
        </div>
  );
}

export default WebSocketTestWithStates;