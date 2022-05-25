import "styles/ui/Enemy.scss";
import {GoPerson} from "react-icons/go";

export const Enemy = (props) => {
    let username = props.username;
    let nCards = props.nCards;
    let isCurrentTurn = props.isCurrentTurn;
    let isCurrentTurnClass = "game singleEnemy";
    isCurrentTurnClass = isCurrentTurn ? isCurrentTurnClass + " activePlayer" : isCurrentTurnClass;

    return(
        <div className ={isCurrentTurnClass}>
            <h1><GoPerson/></h1>
            <p> {username} </p>
            <p> {nCards} cards </p>
        </div>
    )
}