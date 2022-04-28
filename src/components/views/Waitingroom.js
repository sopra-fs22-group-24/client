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
      history.push('/game/'+gameId);
      
    }
    
    
    //fetch all user-data for this waitingroom
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
          async function fetchData() {
            try {
              const response = await api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}});
              for (let i in response.data) {
                  console.log(response.data[i].lobbyId);
                  console.log(gameId);
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
      
    // users displayed correctly   
    let content; 
    if (users) {
        content = (
        <div className="waitingroom">
            <ul> 
                {users.map(user => (
                    <div>
                        <Circle>
                            U{user.id}
                        </Circle> 
                        
                        <div className ="waitingroom labelBottom">{user.username}</div>
                    </div> 
                ))}         

            </ul>  
        </div>
        );
    } 

    
    
    return (
        <BaseContainer className="waitingroom container">
            <h2 className = "waitingroom label">Waitingroom</h2>
            <div className = "waitingroom Url">Invite Friends: localhost:3000/waitingroom/{localStorage.getItem('gameId')}</div>
            
            <div className = "waitingroom content">{content}</div>
            
            <Box
                className = "waitingroom field"
                onClick={() => goToGame(gameId)}
                >
                    Start Game
                </Box>

            
        </BaseContainer>
    );
}


export default Waitingroom;