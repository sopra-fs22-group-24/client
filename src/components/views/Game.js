import {NumericCard} from 'components/ui/NumericCard';
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
import React from "react";
import {generatePath, Link} from "react-router-dom";



const Game = props => {
    let socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));

    let hand = []
    let middleCard = drawCard();
    let middleCardColor = "red";
    let middleCardSymbol = 1;

    const gameId = localStorage.getItem('gameId');
    const userId = localStorage.getItem("id");

    function drawCard() {
        socket.subscribe('/game/' + gameId + '/drawCard', NewCard);
    }
     const NewCard = (response) => {
        return response;
     }

    function playCard(card){
        const responseBody = (gameId, card, userId)
        socket.send('/game/' + gameId +'/playCard', responseBody);
        middleCard = card;
        middleCardColor = middleCard.color;
        middleCardSymbol = middleCard.symbol;
    }

    function uno(){
        synthesizeSpeech("UNO")
        socket.send('/game/' + gameId +'/UNO', userId)
    }

    function protest(){
        synthesizeSpeech("Wrong")
        socket.send('/game/' + gameId +'/callOut', userId)
    }

    return (
        <BaseContainer>
            <div className="game enemyContainer">
                <Enemy>
                    <h1><GoPerson/></h1>
                    <p> Susie</p>
                    <p> 5 cards</p>
                    </Enemy>

                <Enemy>
                    <h1><GoPerson/></h1>
                    <p> Joe </p>
                    <p> 3 cards</p>
                </Enemy>
                <Enemy>
                    <h1><GoPerson/></h1>
                    <p> Peter </p>
                    <p> 6 cards</p>
                </Enemy>
            </div>

            <div className="game container">
                <div className="game launcher">
                    <Launcher onClick={() => drawCard()}>
                        Launch
                    </Launcher>
                </div>
                <div className="game middleCard">
                    <NumericCard>
                        <div className="numeric-card" backgroundColor = "blue">
                        {middleCardSymbol}
                        </div>
                    </NumericCard>
                </div>
            </div>

            <div className="game playerContainer">
                <div className="game ownUser">
                    <Circle>
                        me
                    </Circle>
                </div>
                <div claseName="game handContainer">
                    <div className="game firstOwnCard">
                        <NumericCard>
                            <div className="numeric-card green">
                                1
                            </div>
                        </NumericCard>
                        <div className="game nextCards">
                            <NumericCard>
                                <div className="numeric-card red">
                                    2
                                </div>
                            </NumericCard>
                            <div className="game nextCards">
                                <NumericCard>
                                    <div className="numeric-card red">
                                        3
                                    </div>
                                </NumericCard>
                                <div className="game nextCards">
                                    <NumericCard>
                                        <div className="numeric-card yellow">
                                            4
                                        </div>
                                    </NumericCard>
                                    <div className="game nextCards">
                                        <NumericCard>
                                            <div className="numeric-card blue">
                                                5
                                            </div>
                                        </NumericCard>
                                        <div className="game nextCards">
                                            <NumericCard>
                                                <div className="numeric-card green">
                                               6
                                                </div>
                                            </NumericCard>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="game buttonContainer">
                    <div>
                        <h1> empty </h1>
                        <Button
                            width="100px"
                            onClick = {() => uno()}>
                            UNO
                        </Button>{'     '}
                        <h1> empty </h1>
                        <Button
                            width="100px"
                            onClick = {() => protest()}>
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
