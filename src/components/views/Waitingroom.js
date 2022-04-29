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
    const [ownUsername, setOwnUsername] = useState(null);
    const [users, setUsers] = useState(null);
    const [gameMaster, setGameMaster] = useState(null);
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
              const id = localStorage.getItem("id")
              const responseUser = await api.get(`/users/${id}`);//actual user on the page.
              setOwnUsername(responseUser.data.username);
              for (let i in response.data) {
                
                if (response.data[i].lobbyId==gameId){
                    console.log(response.data[i]);
                    setUsers(response.data[i].players);
                    //console.log(users);
                    //console.log(response.data[i].players);
                    setGameMaster(response.data[i].players[0].username);
                    console.log(response.data[i].players[0].username);
                    //console.log(gameMaster);
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
        console.log(users);
      
    // users displayed correctly   
    let content; 
    if (users) {
        content = (
        <div id="menu">
            <ul> 
                {users.map(user => (
                    <li>
                        <Circle>
                            U{user.id}
                        </Circle> 
                        
                        <div className ="waitingroom labelBottom">{user.username}</div>
                    </li>
                ))}         

            </ul>  
        </div>
        );
    } 
    console.log("GameMaster:");
    console.log(gameMaster);
    console.log("Own Username:");
    console.log(ownUsername);
    console.log(gameMaster==ownUsername);

    
    
    return (
        <BaseContainer className="waitingroom container">
             <h2 className = "waitingroom label">Waitingroom</h2> 
             <div className = "waitingroom Url">Invite Friends: localhost:3000/waitingroom/{localStorage.getItem('gameId')}</div>
             <div className = "waitingroom content">{content}</div>
            
             <Box
             className = "waitingroom field"
             disabled={gameMaster!=ownUsername}
             onClick={() => goToGame(gameId)}
             >
                 Start Game
             </Box>   
        </BaseContainer>
    );
}


export default Waitingroom;