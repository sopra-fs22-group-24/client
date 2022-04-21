import BaseContainer from "components/ui/BaseContainer";
//import { api } from "helpers/api";
import { Button } from 'components/ui/Button';
//import React, { useState } from 'react';
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import SocketConnection from 'helpers/socketConnection';
import "styles/views/Profile.scss";


const Lobby = () => {
    const [lobbies, setLobbies] = useState(null);
    /* var socket = new SocketConnection();
    socket.subscribe("/lobby/messages", callBackFunction);
    socket.connect(localStorage.getItem('token')); */
    //const response = api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}})
    
    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
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

    fetchData();
    }, []);
  let content; 
  if (lobbies) {
    content = (
      <div className="lobby">
        <ul className="lobby lobbyList">
            {lobbies.map(lobby => ( 
                <div>LobbyId: {lobby.lobbyId} </div>        
             
              ))}         

        </ul>  
      </div>
    );
  } 
    
    return (
        <BaseContainer className="profile container">
            <h2>Lobby</h2>
            {/* <h1>'response.data(1)'</h1>
            <p className="lobby paragraph">
            Get all lobbies from secure endpoint:
            </p>
            {content} */}
            {content}
            <Button
                onClick={() => console.log(lobbies)}></Button>
        </BaseContainer>
        
    );
}


export default Lobby;