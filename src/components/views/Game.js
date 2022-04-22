import {NumericCard} from 'components/ui/NumericCard';
import {SpecialCard} from 'components/ui/SpecialCard';
import {Launcher} from 'components/ui/Launcher';
import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import {Enemy} from "../ui/Enemy";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
import SocketConnection from "../../helpers/socketConnection";
//import PropTypes from "prop-types";
import {GoPerson} from "react-icons/go";
import React from "react";

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

const Game = props => {
    var socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));
    const hand = {}

    function drawCard() {
        socket.get("/game/{gameId}/drawCard");
        //add to hand;
    }

    function playCard(){
        socket.get("/game/{gameId}/playCard");
        //if ok put card in middle
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
                {/* Buttons */}
                <div className="game launcher">
                    <Launcher onClick={() => drawCard()}>
                        Launch
                    </Launcher>
                </div>
                <div className="game middleCard">
                    <NumericCard>
                        <div className="numericcard red">
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
                            <div className="numericcard green">
                                1
                            </div>
                        </NumericCard>
                        <div className="game nextCards">
                            <NumericCard>
                                <div className="numericcard red">
                                </div>
                            </NumericCard>
                            <div className="game nextCards">
                                <NumericCard>
                                    <div className="numericcard red">
                                    </div>
                                </NumericCard>
                                <div className="game nextCards">
                                    <NumericCard>
                                        <div className="numericcard yellow">
                                        </div>
                                    </NumericCard>
                                    <div className="game nextCards">
                                        <NumericCard>
                                            <div className="numericcard blue">
                                            </div>
                                        </NumericCard>
                                        <div className="game nextCards">
                                            <NumericCard>
                                                <div className="numericcard green">
                                                </div>
                                            </NumericCard>
                                            <div className="game nextCards">
                                                <SpecialCard>
                                                    <div className="specialcard blue">
                                                        <div className="specialcard middle">HIT</div>
                                                    </div>
                                                </SpecialCard>
                                            </div>
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
                            onClick = {() => synthesizeSpeech("UNO")}>
                            UNO
                        </Button>{'     '}
                        <h1> empty </h1>
                        <h1> empty</h1>
                        <Button
                            width="100px"
                            onClick = {() => synthesizeSpeech("Wrong")}>
                            PROTEST
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>

    );
};


export default Game;
