import React, {useEffect, useState} from "react";
import {NumericCard} from 'components/ui/NumericCard';
import {Launcher} from 'components/ui/Launcher';
import {Button} from 'components/ui/Button';
import {Enemy} from "../ui/Enemy";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
import SocketConnection from "../../helpers/socketConnection";
import Confetti from 'react-confetti'
import {useHistory, useParams} from "react-router-dom";
import Popup from "../ui/Popup";


const Game = () => {

    let hand = []
    const gameId = useParams().id;
    console.log(gameId)
    const history = useHistory();
    const [uno, setUno] = useState(false);
    const [middleCard, setMiddleCard] = useState({color: "YELLOW", symbol: "Test"});
    const [users, setUsers] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(null);
    const [cards, setCards] = useState(null);
    const [newColor, setNewColor] = useState(null);
    const [target, setTarget] = useState(null);
    const [saidUno, setSaidUno] = useState(null);
    const [usernames, setUsernames] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () =>{ setIsOpen(!isOpen);}

    const userId = localStorage.getItem("id");
    const username = localStorage.getItem("username");

    //changes Card in the middle of the table
    const topMostCardCallback = (response) => {
        console.log("/game/" + gameId + "/topMostCard")
        console.log(response);
        setMiddleCard(response);
    }

    //Whose turn
    const playerTurnCallback = (response) => {
        console.log("/game/" + gameId + "/playerTurn")
        console.log(response);
        setCurrentTurn(response.username);
    }

    //How many cards do the players have
    const playerHasNCardsCallback = (response) => {
        console.log("/game/" + gameId + "/playerHasNCards")
        console.log(response);
        if (Array.isArray(response)) {setUsers(response)}
        /*let currentUsers = [];
        currentUsers.push(response);
        setUsers(currentUsers);
        let currentUsernames = [];
        for (let i = 0; i < currentUsers.length; i++){
            currentUsernames.push(currentUsers[i]);
        }
        setUsernames(currentUsernames);

         */
    }

    //Users initial cards
    const playerCardsCallback = (response) => {
        console.log("/users/queue/" + gameId + "/cards")
        console.log(response)
        setCards(response);
    }

    //User new cards
    const playerCardsDrawnCallback = (response) => {
        console.log("/users/queue/" + gameId + "/cardsDrawn")
        console.log(response)
        setCards(response)
    }

    //Errors
    const receiveErrorCallback = (response) => {
        console.log("error")
        console.log(response)
    }

    //Wrongly said uno
    const calledOutCallback = (response) => {
        console.log("calledOut")
        console.log(response)
    }

    //Someone said UNO
    const unoCallback = (response) => {
        console.log("Uno");
        console.log(response);
        setSaidUno(response.username);
        synthesizeSpeech("UNO");
    }

    //User hand after first time
    const playedCardCallback = (response) => {
        console.log("/game/" + gameId + "/playedCard")
        setCards(response)
    }

    const scoreCallback = (response) => {
        console.log(response);
        togglePopup();

    }

    const initGame = () => {
        SocketConnection.send("/app/game/" + gameId + "/init")
    }

    const drawCards = () => {
        SocketConnection.send("/app/game/" + gameId + "/drawCard")
    }

    //play a Card. Checks if Wildcard or Extreme Hit
    const playCard = (index) => {
        console.log("played Card");
        //debugger;
        let card = cards[index];
        if (card.symbol == "WILDCARD") {


            //let newColor = prompt("What color do you wish?");
            let newCard = {color: newColor, symbol: card.symbol};
            let payload = {"card": newCard, "user": null, "uno": uno};
            SocketConnection.send("/app/game/" + gameId + "/playCard", payload);
        } else if (card.symbol == "EXTREME_HIT") {
            //let newColor = prompt("What color do you wish?");
            let enemyGetsHit = prompt("Who do you want to hit? Enter Username");
            let newCard = {color: newColor, symbol: card.symbol};
            let user = {"username": enemyGetsHit}
            let payload = {"card": newCard, "user": user, "uno": uno};
            SocketConnection.send("/app/game/" + gameId + "/playCard", payload);
        } else {
            let payload = {"card": cards[index], "user": null, "uno": uno}
            SocketConnection.send("/app/game/" + gameId + "/playCard", payload);
        }
    }

    function sayUno() {
        SocketConnection.send('/game/' + gameId + '/UNO', userId);
        setUno(true);
        }

    function protest() {
        synthesizeSpeech("Wrong")
        SocketConnection.send('/game/' + gameId + '/callOut', userId)
    }

    function goToDashboard() {
        history.push('/dashboard');
    }

    const displayHand = () => {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            hand.push(
                <div className="game cardWrapper">
                    <NumericCard
                        color={card.color}
                        symbol={card.symbol}
                        onClick={() => playCard(i)}
                        onChange={c => setNewColor(c)}
                        usernames = {usernames}
                    />
                </div>
            )
        }
        return (hand)
    }

    let EnemyDisplay;
    if (users) {
        EnemyDisplay = (
            <>
                {users.map(user => (
                    <Enemy
                        username={user.username}
                        nCards={user.nCards}
                    >
                    </Enemy>
                ))}
            </>
        );
    }

    let gameDisplay = (
        <div className="game initContainer">
            <Button
                width= "150px"
                onClick={() => initGame()}>
                START
            </Button>
        </div>);

    let userWhoSaidUno;

    if (saidUno) {
        userWhoSaidUno= (
            <>
                <h3> {saidUno} called out UNO!</h3>
        </>
        )
    }


    useEffect(() => {
        console.log("beforeConnection")
        console.log(gameId)
        SocketConnection.purge()
        SocketConnection.subscribe("/game/" + gameId + "/topMostCard", topMostCardCallback)
        SocketConnection.subscribe("/game/" + gameId + "/playerTurn", playerTurnCallback)
        SocketConnection.subscribe("/game/" + gameId + "/playerHasNCards", playerHasNCardsCallback)
        SocketConnection.subscribe("/game/" + gameId + "/calledOut", calledOutCallback)
        SocketConnection.subscribe("/game/" + gameId + "/saidUno", unoCallback)
        SocketConnection.subscribe("/game/" + gameId + "/score", scoreCallback)
        // privateChannel
        SocketConnection.subscribe("/users/queue/" + gameId + "/cards", playerCardsCallback)
        SocketConnection.subscribe("/users/queue/" + gameId + "/cardsDrawn", playerCardsDrawnCallback)
        SocketConnection.subscribe("/users/queue/error", receiveErrorCallback)
        SocketConnection.subscribe("/users/queue/" + gameId + "/playedCard", playedCardCallback)

        SocketConnection.connect(localStorage.getItem('token'), true);

    }, [gameId]);


    if (cards) {
        gameDisplay = (
            <div>
                <div className="game topContainer">
                    <div className="game currentPlayerContainer">
                        <h3> Current player: {currentTurn}</h3>
                        <h3>{saidUno} said UNO</h3>
                    </div>
                    <div className="game enemyContainer">
                        {EnemyDisplay}
                    </div>
                </div>
                <div className="game container">
                    {isOpen && <Popup
                        content={<>
                            <Confetti
                                width="700px"
                                height="300px"
                            />
                            <b>And the winner is...</b>
                            <p>You won!</p>
                            <button onClick={() => goToDashboard()}>To Dashboard</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                    <div className="game launcher">
                        <Launcher onClick={() => drawCards()}>
                               Launch
                        </Launcher>
                    </div>
                    <div className="game middleCard">
                        <NumericCard
                            color={middleCard.color}
                            symbol={middleCard.symbol}
                        />
                    </div>
                </div>

                <div className="game playerContainer">
                    <div className="game ownUser">
                        <h1> {username} </h1>
                    </div>
                    <div className="game handContainer">
                            {displayHand()}
                    </div>

                    <div className="game buttonContainer">
                        <div>
                            <h1> empty </h1>
                            <Button
                                width="100px"
                                onClick={() => sayUno()}>
                                UNO
                            </Button>{'     '}
                            <h1> empty </h1>
                            <Button
                                width="100px"
                                onClick={() => protest()}>
                                PROTEST
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


        return (
            <BaseContainer>
                {gameDisplay}
            </BaseContainer>

        );
    }
;

const sdk = require("microsoft-cognitiveservices-speech-sdk");

function synthesizeSpeech(text) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("1cb611117bf54151b4b078fcdff6ee56", "switzerlandnorth");
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
        text,
        result => {
            synthesizer.close();
            return result.audioData;
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}


export default Game;