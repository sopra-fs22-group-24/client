import BaseContainer from "components/ui/BaseContainer";
import {useHistory} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import SocketConnection from 'helpers/socketConnection';
import {Circle} from "../ui/Circle";
import {Box} from "../ui/Box";
import "styles/views/Lobby.scss";


const Lobby = () => {
    var socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));
    const [lobbies, setLobbies] = useState(null);
    
    const history = useHistory();
    socket.subscribe("/users/queue/messages", goToURL);
    socket.connect(localStorage.getItem('token'));

    function goToGame() {

        console.log(socket);
        socket.send("/app/createLobby");
       
        
    }
    function goToURL(response){
      console.log(response);
      history.push('/waitingroom/'+response.lobbyId);
  }

    //fetch all lobby-data
    useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
      async function fetchData() {
        try {
          const response = await api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}});
          console.log(response);
          // Get the returned lobbies and update the state.
          setLobbies(response.data);
          
        } catch (error) {
          console.error(`Something went wrong while fetching the lobbies: \n${handleError(error)}`);
          console.error("Details:", error);
          alert("Something went wrong while fetching the lobbies! See the console for details.");
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
                  <Box 
                      className = "lobby field"
                      onClick={() => goToLobby(lobby.lobbyId)}>
                        
                      <div className ="lobby labelLeft">Game {lobby.lobbyId}</div>  
                      <div className ="lobby labelRight">Players joined: 
                      {lobby.players.map(player => (<div>{player.username}</div>))}</div>
                  </Box>
                    
                   {/*  <div>Players joined:</div>
                    {lobby.players.map(player => (
                      <div>{player.username}</div>
                    ))} */}
                    
                    
                     
                  
                </div> 
              ))}         

          </ul>  
       </div>
    );
  } 
  
  function goToLobby(id){
    localStorage.setItem('gameId',id);
    socket.send("/app/joinLobby", {"lobbyId": id} );
    history.push('/waitingroom/'+id);

  }


  function goToProfile() {
    history.push('/user');
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
            <h2>Games to join:</h2>
            
            {content}
            <Box
                className = "lobby field"
                onClick={() => goToGame()}
            >
                New Game
            </Box>
          </div>
          
        </div>
        
      </BaseContainer>
      
  );
}


export default Lobby; 