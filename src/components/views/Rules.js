import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Rules.scss";
import {Button} from "../ui/Button";
import React from "react";
import {useHistory} from 'react-router-dom';
import {Circle} from "../ui/Circle";
import { GiSpeaker } from "react-icons/gi";
import {BsPerson} from "react-icons/bs";

const sdk = require("microsoft-cognitiveservices-speech-sdk");

const objectText = "The first player to play all of the cards in their hand wins the game"
const setUpText = "Each player is dealt 7 cards. One card is placed in the middle of the game"
const specialCardText = "Reverse Card:This card reverses direction of play. Skip Card: The next person in line to play after this card is played loses his/her turn and is skipped. This card may only be played on matching color or on another Skip card. Hit 2: The next person must hit the launcher twice and forfeit his/her turn. This card may only be played on a matching color or on another Hit 2 card. Discard All: Play this card when you want to discard all of the cards in your hand of the same color. For example, if a yellow 7 is in the Discard pile, you may discard all the yellow cards in your hand, with a yellow Discard All card placed on top. Wild Card: This card can be played on any card. When you play this card, you may change the color being played to any color. Extreme Hit:  When this card is played, whoever played it gets to call any color and then choose any other player in the game to hit."
const letsPlayText = "Match the top card on the discard pile either by number, color or word. For example, if the card is a Green 7, you must play a green card or any color 7. Or, you may play any Wild card. If you don't have anything that matches, you must press the launcher and the play moves to the next person."
const unoText = "Before playing your next to last card, you must click on the UNO Button. If you don't press it and another player catches you with just one card before the next player begins their turn you must press the launcher twice. If you are not caught before the next player either plays or draws a card, you do not have to draw the extra cards. Once the player plays their last card, the game is over."


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

const Rules = () => {
    const history = useHistory();
    //const timeout = setTimeout(noMoreTime, 600000);//calls function noMoreTime after 10 minutes
    
    function noMoreTime(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
        history.push('/login');
    }

    const goToDashboard = async () => {
        history.push(`/dashboard`);
    };
    function goToProfile() {
        history.push('/user');
    }

    return (
        <BaseContainer>
            <div className="rules profile-container">
                <Circle
                    onClick={() => goToProfile()}
                >
                    <BsPerson fontSize="100px"/>
                </Circle>
            </div>
            <div className="rules container">
                <div className="rules form">
                    <h1>Rules...</h1>
                    <h3> Object <Circle className = "audio" onClick = {() => synthesizeSpeech(objectText)}> <GiSpeaker/> </Circle></h3>
                    <p> {objectText} </p>
                    <h3>Set up<Circle className = "audio" onClick = {() => synthesizeSpeech(setUpText)}> <GiSpeaker/> </Circle></h3>
                    <p> {setUpText}</p>
                    <h3>Special cards<Circle className = "audio" onClick = {() => synthesizeSpeech(specialCardText)}> <GiSpeaker/> </Circle></h3>
                    <p> <span className="bold">Reverse Card: </span> This card reverses direction of play.</p>
                    <p> <span className="bold">Skip Card </span> The next person in line to play after this card is played loses
                        his/her turn and is skipped. This card may only be played on matching color or on another Skip
                        card</p>
                    <p> <span className="bold">Hit 2: </span> The next person must hit the launcher twice and forfeit his/her turn.
                        This card may only be played on a matching color or on another Hit 2 card.</p>
                    <p> <span className="bold">Discard All: </span>Play this card when you want to discard all of the cards in your hand of the same color.
                    For example, if a yellow 7 is in the Discard pile, you may discard all the yellow cards in your hand, with a
                    yellow Discard All card placed on top. </p>
                    <p> <span className="bold">Wild Card: </span> This card can be played on any card. When you play this card, you may change the color being played to any color.</p>
                    <p> <span className="bold">Extreme Hit: </span> When this card is played, whoever played it gets to call any color and then choose any other player
                    in the game to "hit".</p>
                    <h3> Let's play<Circle className = "audio" onClick = {() => synthesizeSpeech(letsPlayText)}> <GiSpeaker/> </Circle></h3>
                    <p> {letsPlayText} </p>
                    <h3> Uno<Circle className = "audio" onClick = {() => synthesizeSpeech(unoText)}> <GiSpeaker/> </Circle></h3>
                    <p> {unoText} </p>
                    <Button
                        width="7em"
                        onClick={() => goToDashboard()}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
}


export default Rules;