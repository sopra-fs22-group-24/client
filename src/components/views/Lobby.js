import BaseContainer from "components/ui/BaseContainer";
import {useHistory} from 'react-router-dom';
//import { Lobby } from 'components/ui/Lobby';
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import SocketConnection from 'helpers/socketConnection';
import {Circle} from "../ui/Circle";
import {LobbyButton} from "../ui/LobbyButton";
import "styles/views/Lobby.scss";


const Lobby = () => {
    const [lobbies, setLobbies] = useState(null);
    
    const history = useHistory();
    /* var socket = new SocketConnection();
    socket.subscribe("/lobby/messages", callBackFunction);
    socket.connect(localStorage.getItem('token')); */

    //fetch all lobby-data
    useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
      async function fetchData() {
        try {
          const response = await api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}});

          // Get the returned lobbies and update the state.
          setLobbies(response.data);
          
        } catch (error) {
          console.error(`Something went wrong while fetching the lobbies: \n${handleError(error)}`);
          console.error("Details:", error);
          alert("Something went wrong while fetching the users! See the console for details.");
        }
      }
      fetchData();}, []
    );
  console.log(lobbies);

  
  
  // lobby-content displayed correctly   
  let content; 
  if (lobbies) {
    content = (
       <div className="lobby">
          <ul className="lobby lobbyList"> 
            {lobbies.map(lobby => (
                <div>
                  <LobbyButton>
                    <div>Game {lobby.lobbyId}</div>
                    <div>Players joined:</div>
                    {lobby.players.map(player => (
                      <div>{player.username}</div>
                    ))}
                    {/* <div>{lobby.players.forEach(player => (
                      <div>{lobby.players.length} Players joined: {player.username}
                    </div>))}</div> */}
                    
                     
                  </LobbyButton> 
                </div> 
              ))}         

          </ul>  
       </div>
    );
  } 
  
  

  function goToProfile() {
    history.push('/profile');
  }
    
  return (
      <BaseContainer>
        <div className="lobby ownUser">
          <Circle
              onClick={() => goToProfile()}
          >
              ME
          </Circle>    
        </div>
        <div className="lobby container">
          <div className="lobby form">
            <h2>Lobby</h2>
            
            {content}
          </div>
        </div>
      </BaseContainer>
      
  );
}


export default Lobby; 