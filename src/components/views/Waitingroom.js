import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from 'react';
import "styles/views/Waitingroom.scss";
import SocketConnection from 'helpers/socketConnection';
import {useHistory} from 'react-router-dom';
import {api, handleError} from 'helpers/api';

import {Box} from "../ui/Box";

const Waitingroom = () => {
    //socketconnection
    var socket = new SocketConnection();
    socket.subscribe("/users/queue/messages", goToURL);
    socket.connect(localStorage.getItem('token'));

    const [users, setUsers] = useState(null);
    let gameId = localStorage.getItem('gameId');
    
    const history = useHistory();

    

    function goToGame(id){
        history.push('/game/'+id);
    
    }
    function goToURL(response){
      console.log(response);
      history.push('/game/'+gameId);
      
    }
    


    
    

    return (
        <BaseContainer className="waitingroom container">
            <h2 className = "waitingroom label">Waitingroom</h2>
            <div className = "waitingroom Url">Invite Friends: localhost:3000/waitingroom/{localStorage.getItem('gameId')}</div>
            
            {/* Users: Profile picture, names, remained cards */}
            <div className="waitingroom ownUser">
                    <Circle>
                        me
                    </Circle>
                    <div className="waitingroom bottomComment"> Me  </div>
                <div className="waitingroom Enemy">
                <Circle>
                   1st 
                </Circle>
                <div className="waitingroom bottomComment"> Enemy1  </div>

                    <div className="waitingroom Enemy">
                    <Circle>
                    2nd
                    </Circle>
                    <div className="waitingroom bottomComment"> Enemy2  </div>
                    </div>
                </div>
                <Box
                className = "lobby field"
                onClick={() => goToGame(gameId)}
                >
                    Start Game
                </Box>
            </div>

            
        </BaseContainer>
    );
}


export default Waitingroom;