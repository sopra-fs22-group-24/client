import NumericCard from 'components/ui/NumericCard';
import {SpecialCard} from 'components/ui/SpecialCard';
import {Launcher} from 'components/ui/Launcher';
import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import {Enemy} from "../ui/Enemy";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
import SocketConnection from "../../helpers/socketConnection";
import PropTypes from "prop-types";
import {GoPerson} from "react-icons/go";
import React, {useEffect, useState} from "react";
import {generatePath, Link, useParams} from "react-router-dom";
import Card from "../../models/Card";
import {api, handleError} from "../../helpers/api";


const Game = props => {


    let socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));

    const {id} = useParams();

    let cards = [{color:"YELLOW", symbol:"1"}, {color:"YELLOW", symbol:"2"},{color:"YELLOW", symbol:"3"},{color:"YELLOW", symbol:"4"}]
    let hand = []
    let uno = false;
    const [middleCard, setMiddleCard] = useState(null);
    const [users, setUsers] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(null);
    //const [gameId, setGameId] = useState(null);

    const gameId = localStorage.getItem('gameId');
    const userId = localStorage.getItem("id");
    const username = localStorage.getItem("username");

    const initGame = () => {
        socket.send("/app/game/" + gameId + "/init")
        socket.subscribe("/game/" + gameId + "/topMostCard", topMostCardCallback)
        socket.subscribe("/game/" + gameId + "/playerTurn", playerTurnCallback)
        socket.subscribe("/game/" + gameId + "/playerHasNCards", playerHasNCardsCallback)

        // privateChannel
        socket.subscribe("/users/queue/" + gameId + "/cards", playerCardsCallback)
        socket.subscribe("/users/queue/" + gameId + "/cardsDrawn", playerCardsDrawnCallback)
    }

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
    }

    const playerCardsCallback = (response) => {
        console.log("/users/queue/" + gameId + "/cards")
        console.log(response)
        cards = response;
    }

    const playerCardsDrawnCallback = (response) => {
        console.log("/users/queue/" + gameId + "/cardsDrawn")
        console.log(response)
        cards = cards.concat(response);
    }


    const drawCards = () => {
        socket.send("/app/game/" + gameId + "/drawCard")
    }

    //not finished
    const playCard = (index) => {
        let card = cards[index];
        if (card.color == "WILDCARD"){
            let newColor = prompt("What color do you wish?");
        }
        if (card.color == "EXTERMEHIT"){

        }
        let payload = {"card": cards[index], "user": null, "uno": {uno}}
        socket.send("/app/game/" + gameId + "/playCard", payload);
        setMiddleCard(cards[index]);
        cards.splice(index,1);
    }

    function sayUno() {
        synthesizeSpeech("UNO")
        socket.send('/game/' + gameId + '/UNO', userId)
    }

    function protest() {
        synthesizeSpeech("Wrong")
        socket.send('/game/' + gameId + '/callOut', userId)
    }

    const displayHand = () => {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            hand.push(
                <div className="game firstOwnCard">
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

    let displayEnemies;

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}});
                const id = localStorage.getItem("id")
                const responseUser = await api.get(`/users/${id}`);//actual user on the page.
                for (let i in response.data) {
                    if (response.data[i].lobbyId==gameId){
                        setUsers(response.data[i].players);
                    }
                }

            } catch (error) {
                console.error(`Something went wrong while fetching the lobbies: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the lobbies! See the console for details.");
            }
        }
        fetchData();}, []
    );

    if (users) {
        displayEnemies = (
            <div id="menu">
                <ul>
                    {users.map(user => (
                            <Enemy>
                                <h1><GoPerson/></h1>
                                <p> {user.username}</p>
                                <p> 7 cards</p>
                            </Enemy>

                    ))}

                </ul>
            </div>
        );
    }


    let displayMiddleCard = (
        <NumericCard color="YELLOW" symbol="6"/>
       // <div>
       //     <NumericCard color={middleCard.color} symbol={middleCard.symbol}/>
       // </div>
    );

    return (
        <BaseContainer>
            <div className="game topContainer">
                <div className="game initContainer">
                    <Button
                        width="100px"
                        onClick={() => initGame()}>
                        START
                    </Button>
                </div>
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
                    {displayMiddleCard}
                </div>
            </div>

            <div className="game playerContainer">
                <div className="game ownUser">
                    <h1> {username} </h1>
                </div>
                <div className="game handContainer">
                    <div className="game firstOwnCard">
                        {displayHand()}
                    </div>
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
        </BaseContainer>

    );
};

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