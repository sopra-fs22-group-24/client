import {NumericCard} from 'components/ui/NumericCard';
import {Launcher} from 'components/ui/Launcher';
import {Button} from 'components/ui/Button';
import {Enemy} from "../ui/Enemy";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
import SocketConnection from "../../helpers/socketConnection";
import socket from "helpers/socketConnection"
import React, {useEffect, useState} from "react";
//import {generatePath, Link, useParams} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
//import {Spinner} from "../ui/Spinner";


const Game = () => {

        let hand = []
        let uno = false;
        const [gameId, setGameId] = useState(localStorage.getItem("gameId"))
        const [middleCard, setMiddleCard] = useState({color: "YELLOW", symbol: "Test"});
        const [users, setUsers] = useState(null);
        const [currentTurn, setCurrentTurn] = useState(null);
        const [cards, setCards] = useState(null);

        const userId = localStorage.getItem("id");
        const username = localStorage.getItem("username");

        const topMostCardCallback = (response) => {
            console.log("/game/" + gameId + "/topMostCard")
            console.log(response);
            setMiddleCard(response);
        }

        const playerTurnCallback = (response) => {
            console.log("/game/" + gameId + "/playerTurn")
            console.log(response);
            setCurrentTurn(response.username);
        }

        const playerHasNCardsCallback = (response) => {
            console.log("/game/" + gameId + "/playerHasNCards")
            console.log(response);
            let currentUsers = [];
            currentUsers.push(response);
            setUsers(currentUsers);
        }

        const playerCardsCallback = (response) => {
            console.log("/users/queue/" + gameId + "/cards")
            console.log(response)
            setCards(response);
        }

        const playerCardsDrawnCallback = (response) => {
            console.log("/users/queue/" + gameId + "/cardsDrawn")
            console.log(response)
            setCards(response)
        }

        const receiveErrorCallback = (response) => {
            console.log("error")
            console.log(response)
        }

        const calledOutCallback = (response) => {
            console.log("calledOut")
            console.log(response)
        }

        const initGame = () => {
            socket.send("/app/game/" + gameId + "/init")
        }

        const drawCards = () => {
            socket.send("/app/game/" + gameId + "/drawCard")
        }

        const playedCardCallback = (response) => {
            console.log("/game/" + gameId + "/playedCard")
            setCards(response)

        }
        const playCard = (index) => {
            console.log("played Card");
            //debugger;
            let card = cards[index];
            if (card.symbol == "WILDCARD") {
                let newColor = prompt("What color do you wish?");
                let newCard = {color: newColor, symbol: card.symbol};
                let payload = {"card": newCard, "user": null, "uno": uno};
                socket.send("/app/game/" + gameId + "/playCard", payload);
            } else if (card.symbol == "EXTREME_HIT") {
                let newColor = prompt("What color do you wish?");
                let enemyGetsHit = prompt("Who do you want to hit?");
                let newCard = {color: newColor, symbol: card.symbol};
                let user = {"username": enemyGetsHit}
                let payload = {"card": newCard, "user": user, "uno": uno};
                socket.send("/app/game/" + gameId + "/playCard", payload);
            } else {
                let payload = {"card": cards[index], "user": null, "uno": uno}
                socket.send("/app/game/" + gameId + "/playCard", payload);
            }
        }

        function sayUno() {
            synthesizeSpeech("UNO");
            socket.send('/game/' + gameId + '/UNO', userId);
            uno = true;
        }

        function protest() {
            synthesizeSpeech("Wrong")
            socket.send('/game/' + gameId + '/callOut', userId)
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
                        />
                    </div>
                )
            }
            return (hand)
        }

        /*
            let enemyList = [];

            const displayEnemies = () => {
                for (let i = 0; i <= users.length; i++) {
                    const user = users[i];
                    enemyList.push(
                            <Enemy
                                username={user.username}
                                nCards ={user.nCards}
                            >
                            </Enemy>
                    )
                }

                return (enemyList)

            }

         */

        let displayEnemies;

        if (users) {
            displayEnemies = (
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
                    width="100px"
                    onClick={() => initGame()}>
                    START
                </Button>
            </div>);

        /*
        if (gameMaster==username){
            gameDisplay= (
                <div className="game initContainer">
                <Button
                width="100px"
                onClick={() => initGame()}>
                START
                </Button>
                </div>)
            } else {
                gameDisplay = <Spinner/>;
            }

            */
        useEffect(() => {
            socket = new SocketConnection();
            socket.subscribe("/game/" + gameId + "/topMostCard", topMostCardCallback)
            socket.subscribe("/game/" + gameId + "/playerTurn", playerTurnCallback)
            socket.subscribe("/game/" + gameId + "/playerHasNCards", playerHasNCardsCallback)
            socket.subscribe("/game/" + gameId + "/calledOut", calledOutCallback)
            // privateChannel
            socket.subscribe("/users/queue/" + gameId + "/cards", playerCardsCallback)
            socket.subscribe("/users/queue/" + gameId + "/cardsDrawn", playerCardsDrawnCallback)
            socket.subscribe("/users/queue/error", receiveErrorCallback)
            socket.subscribe("/users/queue/" + gameId + "/playedCard", playedCardCallback)

            socket.connect(localStorage.getItem('token'));
            //socket.send("/app/game/" + gameId + "/init")

        }, []);


        if (cards) {
            gameDisplay = (
                <div>
                    <div className="game topContainer">
                        <div className="game currentPlayerContainer">
                            <h3> Current player: {currentTurn}</h3>
                        </div>
                        <div className="game enemyContainer">
                            {displayEnemies}
                        </div>
                    </div>
                    <div className="game container">
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