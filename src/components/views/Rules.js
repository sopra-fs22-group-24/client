import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Rules.scss";
import {Button} from "../ui/Button";
import React from "react";
import {useHistory} from 'react-router-dom';
import {Circle} from "../ui/Circle";


const Rules = () => {
    const history = useHistory();
    const goToDashboard = async () => {
        history.push(`/dashboard`);
    };
    function goToProfile() {
        history.push('/profile');
    }

    return (
        <BaseContainer>
            <div className="rules header">
                <Circle
                    onClick={() => goToProfile()}
                >
                    L
                </Circle>
            </div>
            <div className="rules container">
                <div className="rules form">
                    <h1>Rules</h1>
                    <h3> Object</h3>
                    <p> The first player to play all of the cards in their hand
                        in each round scores points for the cards their opponents are left holding.
                        The first player to score 500 points wins the game</p>
                    <h3>Set up</h3>
                    <p> Each player is dealt 7 cards. One card is placed in the middle of the game</p>
                    <h3>Special cards</h3>
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
                    <h3> Let's play</h3>
                    <p> Match the top card on the discard pile either by number, color or word.
                        For example, if the card is a Green 7, you must play a green card or any color 7. Or, you may
                        play any Wild card. If you don't have anything that matches, you must press the launcher. If you draw a card you can play, play it. Otherwise, play moves to the
                        next person. </p>
                    <h3> Uno</h3>
                    <p> Before playing your next to last card, you must click on the "UNO" Button. If you don't press
                        it and another player catches you with just one card before the next player begins their turn you must press the launcher twice.
                        If you are not caught before the next player either plays or draws a card, you do
                        not have to draw the extra cards. Once the player plays their last card, the hand is over.
                        Points are tallied and you start over again. </p>
                    <h3> Scoring</h3>
                    <p> If you are first to get rid of all your cards, you get points for the cards left in the other
                        players hands.
                    </p>
                    <p> All number cards (0-9): Face Value</p>
                    <p> Hit 2: 20 Points</p>
                    <p> Reverse: 20 Points</p>
                    <p> Skip: 20 Points</p>
                    <p> Discard All: 30 Points</p>
                    <p> Wild: 50 Points</p>
                    <p> Extreme Hit: 50 Points</p>
                    <Button
                        width="50%"
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