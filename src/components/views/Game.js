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
import SelectionPopup from "../ui/SelectionPopup";
import {Spinner} from "../ui/Spinner";
import {TiArrowLeftThick, TiArrowRightThick} from "react-icons/ti";

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
    const [newColor, setNewColor] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [target, setTarget] = useState("");
    const [winner, setWinner] = useState(null);
    const [currentDirection, setCurrentDirection] = useState("right");
    const [arrow, setArrow] = useState(<TiArrowRightThick fontSize="28px"/>);
    const [wildcardIsOpen, setWildcardIsOpen] = useState(false);
    const [xtremIsOpen, setXtremIsOpen] = useState(false);
    const [callOutOpen, setCallOutOpen] = useState(false)
    const [currentMessage, setCurrentMessage] = useState(false);
    const [currentErrorMessage, setCurrentErrorMessage] = useState(false);
    const togglePopupWildcard = () => {
        setWildcardIsOpen(!wildcardIsOpen)
    };
    const togglePopupXtrem = () => {
        setXtremIsOpen(!xtremIsOpen)
    };
    const togglePopup = () => {
        setIsOpen(!isOpen)
    };
    const togglePopupCallOut = () => {
        setCallOutOpen(!callOutOpen)
    }

    const userId = sessionStorage.getItem("id");
    const username = sessionStorage.getItem("username");

    function enableSudo() {
        SocketConnection.send("/app/game/" + gameId + "/enableSudo")
    }

    window.enableSudo = enableSudo;

    function changeDirection() {
        if (currentDirection == "left"){
            setCurrentDirection("right")
            setArrow(<TiArrowRightThick fontSize="28px"/>)
        }else{
            setCurrentDirection("left")
            setArrow(<TiArrowLeftThick fontSize="28px"/>)
        }
    }

    //changes Card in the middle of the table
    const topMostCardCallback = (response) => {
        console.log("/game/" + gameId + "/topMostCard")
        console.log(response);
        setMiddleCard(response);
        if (response.symbol == "WILDCARD") {
            synthesizeSpeech("Wild");
        }
        if (response.symbol == "EXTREME_HIT") {
            synthesizeSpeech("Extreme");
        }
        if  (response.symbol == "REVERSE"){
            changeDirection();
        }
    }

    //Whose turn is it
    const playerTurnCallback = (response) => {
        console.log("/game/" + gameId + "/playerTurn")
        console.log(response);
        setCurrentErrorMessage("");
        setCurrentTurn(response.username);
    }

    //How many cards do the players have
    const playerHasNCardsCallback = (response) => {
        console.log("/game/" + gameId + "/playerHasNCards")
        console.log(response);
        if (Array.isArray(response)) {
            setUsers(response)
        }
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
        setCurrentErrorMessage(response["msg"])
    }

    //Messages
    const messageCallback = (response) => {
        console.log(response)
        setCurrentMessage(response["msg"])
    }

    //Someone was called out for not saying UNO
    const calledOutCallback = (response) => {
        console.log("calledOut")
        console.log(response)
        setCurrentMessage(response.callee + " called out " + response.calledOutPlayer)
    }

    //Someone said UNO
    const unoCallback = (response) => {
        console.log("Uno");
        console.log(response);
        synthesizeSpeech("UNO");
    }

    //User hand after first time
    const playedCardCallback = (response) => {
        console.log("/game/" + gameId + "/playedCard")
        setCards(response)
    }

    //End of Game - Winner
    const gameEndCallback = (response) => {
        console.log(response);
        setWinner(response.username);
        togglePopup();
    }

    //draw new cards from launcher
    const drawCards = () => {
        setCurrentMessage("")
        SocketConnection.send("/app/game/" + gameId + "/drawCard")
    }

    //play a Card. Checks if Wildcard or Extreme Hit
    const playCard = (index) => {
        console.log("played Card");
        setCurrentMessage("")
        let card = cards[index];
        if (card.symbol == "WILDCARD") {
            togglePopupWildcard();
        } else if (card.symbol == "EXTREME_HIT") {
            togglePopupXtrem();
        } else {
            let payload = {"card": cards[index], "user": null, "uno": uno}
            SocketConnection.send("/app/game/" + gameId + "/playCard", payload);
            setUno(false)
        }
    }

    const playWildcard = () => {
        togglePopupWildcard()
        let newCard = {color: newColor, symbol: "WILDCARD"};
        let payload = {"card": newCard, "user": null, "uno": uno};
        SocketConnection.send("/app/game/" + gameId + "/playCard", payload);
        setUno(false)
    }

    const playXtrem = () => {
        togglePopupXtrem()
        let newCard = {color: newColor, symbol: "EXTREME_HIT"};
        let user = {"username": target}
        let payload = {"card": newCard, "user": user, "uno": uno};
        SocketConnection.send("/app/game/" + gameId + "/playCard", payload);
        setUno(false)
    }

    function sayUno() {
        console.log(currentTurn)
        //if it is players turn set Uno to true and send it with next card
        if (currentTurn == sessionStorage.getItem("username")) {
            setUno(true);
        } else {
            SocketConnection.send('/app/game/' + gameId + '/uno', userId);
        }
    }

    function protest() {
        togglePopupCallOut()
        let user = {"username": target}
        SocketConnection.send('/app/game/' + gameId + '/callOut', user)
    }

    function goToDashboard() {
        history.push('/dashboard');
    }

    const handDisplay = () => {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            hand.push(
                <div className="game cardWrapper">
                    <NumericCard
                        color={card.color}
                        symbol={card.symbol}
                        onClick={() => playCard(i)}
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
                        isCurrentTurn={currentTurn == user.username}
                    >
                    </Enemy>
                ))}

            </>
        );
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
        SocketConnection.subscribe("/game/" + gameId + "/gameEnd", gameEndCallback)
        SocketConnection.subscribe("/game/" + gameId + "/messages", messageCallback)
        // privateChannel
        SocketConnection.subscribe("/users/queue/" + gameId + "/cards", playerCardsCallback)
        SocketConnection.subscribe("/users/queue/" + gameId + "/cardsDrawn", playerCardsDrawnCallback)
        SocketConnection.subscribe("/users/queue/error", receiveErrorCallback)
        SocketConnection.subscribe("/users/queue/" + gameId + "/playedCard", playedCardCallback)
        SocketConnection.connect(sessionStorage.getItem('token'), true);
    }, [gameId]);


    let gameDisplay = <Spinner/>;
    if (cards) {
        gameDisplay = (
            <div>
                <div className="game topContainer">
                    <div className="game currentPlayerContainer">
                        <h3> Current player: {currentTurn} </h3>
                        <h3> Direction: {arrow}</h3>
                        <h4>{currentMessage}</h4>
                        <h5>{currentErrorMessage}</h5>
                    </div>
                    <div className="game enemyContainer">
                        {EnemyDisplay}
                    </div>
                </div>

                <div className="game container">
                    {isOpen && <Popup
                        content={<>
                            <Confetti
                                width="580px"
                                height="280px"
                            />
                            <b>And the winner is...</b>
                            <h1> {winner} </h1>
                            <button onClick={() => goToDashboard()}>To Dashboard</button>
                        </>}
                        handleClose={togglePopup}
                    />}

                    {wildcardIsOpen && <SelectionPopup
                        content={<>
                            <b>Please select a color</b>
                            <>
                                <form>
                                    <select value={newColor}
                                            onChange={e => setNewColor(e.target.value)}>
                                        <option value="NULL">Choose Color</option>
                                        <option value="BLUE">Blue</option>
                                        <option value="YELLOW">Yellow</option>
                                        <option value="GREEN">Green</option>
                                        <option value="RED">Red</option>
                                    </select>
                                </form>
                            </>
                            <button onClick={() => playWildcard()}>Submit</button>
                        </>}
                        handleClose={togglePopupWildcard}
                    />}

                    {xtremIsOpen && <SelectionPopup
                        content={<>
                            <b>Please select a color</b>
                            <div>
                                <form>
                                    <div>
                                        <select value={newColor}
                                                onChange={e => setNewColor(e.target.value)}>
                                            <option value="NULL">Choose Color</option>
                                            <option value="BLUE">Blue</option>
                                            <option value="YELLOW">Yellow</option>
                                            <option value="GREEN">Green</option>
                                            <option value="RED">Red</option>
                                        </select></div>
                                    <div>
                                        <select value={target}
                                                onChange={e => setTarget(e.target.value)}>
                                            <option value="NULL"> Choose Target</option>
                                            {users.map((user) => (
                                                <option value={user.username}> {user.username}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <button onClick={() => playXtrem()}>Submit</button>
                        </>}
                        handleClose={togglePopupXtrem}
                    />}
                    {callOutOpen && <SelectionPopup
                        content={<>
                            <b>Choose Player to call out</b>
                            <div>
                                <form>
                                    <div>
                                        <select value={target}
                                                onChange={e => setTarget(e.target.value)}>
                                            <option value="NULL"> Choose Target</option>
                                            {users.map((user) => (
                                                <option value={user.username}> {user.username}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <button onClick={() => protest(target)}>Submit</button>
                        </>}
                        handleClose={togglePopupCallOut}
                    />}


                    <div className="game launcher">
                        <Launcher onClick={() => drawCards()}>
                            Press
                            for
                            Cards
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
                        {handDisplay()}
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
                                Call out
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
};

const sdk = require("microsoft-cognitiveservices-speech-sdk");

function synthesizeSpeech(text) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("1cb611117bf54151b4b078fcdff6ee56", "switzerlandnorth");
    //speechConfig.speechSynthesisVoiceName = "en-US-DavisNeural";
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