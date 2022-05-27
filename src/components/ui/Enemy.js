import "styles/ui/Enemy.scss";
import "styles/ui/picture.scss"
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';



export const Enemy = (props) => {
    let username = props.username;
    const [picture, setPicture] = useState(null);
    let nCards = props.nCards;
    let isCurrentTurn = props.isCurrentTurn;
    let isCurrentTurnClass = "game singleEnemy";

    isCurrentTurnClass = isCurrentTurn ? isCurrentTurnClass + " activePlayer" : isCurrentTurnClass;

    async function fetchProfilePicture() {
        try {
            const response = await api.get(`/users/picture/${username}`);
           setPicture("data:image/jpeg;base64," + response.data)
            
        } catch (error) {
            alert(`Something went wrong fetching the picture\n${handleError(error)}`);
        }
    }
    useEffect(() => {

        fetchProfilePicture();
    }, []);
    return(
    <div>
     
        
       
        <div className ={isCurrentTurnClass}>
        <img className = "picture"
                altf = "" src={picture}/>
       
            <p> {username} </p>
            <p> {nCards} cards </p>
        </div>
    </div>
    )
}