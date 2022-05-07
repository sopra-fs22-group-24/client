import "styles/ui/Enemy.scss";
import {GoPerson} from "react-icons/go";

export const Enemy = (props) => {
    let username = props.username;
    let nCards = props.nCards;

    return(
        <div className = "game singleEnemy">
            <h1><GoPerson/></h1>
            <p> {username} </p>
            <p> {nCards} cards </p>
        </div>
    )
}