import BaseContainer from "components/ui/BaseContainer";
import {useHistory,useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import SocketConnection from 'helpers/socketConnection';
import {Circle} from "../ui/Circle";
import {Box} from "../ui/Box";
import "styles/views/Lobby.scss";


const Lobby = () => {
    var socket = new SocketConnection();
    let gameId;
    socket.connect(localStorage.getItem('token'));
    const [lobbies, setLobbies] = useState(null);
    
    const history = useHistory();
    //socket.subscribe("/users/queue/messages", goToURL);
    //socket.connect(localStorage.getItem('token'));

    //const { id } = useParams();
    
    const [ownUsername, setOwnUsername] = useState(null);

    //fetch all lobby-data
    useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
      async function fetchData() {
        try {

          const response = await api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}});
          const id = localStorage.getItem("id")
          const responseUser = await api.get(`/users/${id}`);
          console.log(responseUser);
          setOwnUsername(responseUser.data.username);
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
  
  function goToGame(){
    socket.send("/app/createLobby",{});
    socket.subscribe("/users/queue/joinLobby", joinLobbyCallback);  
  }

  const joinLobbyCallback = (response) => {
    gameId = response.lobbyId;
    localStorage.setItem('gameId',gameId);
    history.push('/waitingroom/'+gameId);
  }


  async function goToLobby(requestedId){
    
      let alreadyInLobby=0;
      console.log(ownUsername);
      for (let i in lobbies){
        if (lobbies[i].lobbyId==requestedId){//find lobby to join
          for (let j in lobbies[i].players){
            if (lobbies[i].players[j].username==ownUsername){//look for own username in players list in lobby to join
              alreadyInLobby=1;
            }
          }
        }
      }
      if (alreadyInLobby===0){//user didn't join so far!
        localStorage.setItem('gameId',requestedId);
        socket.send("/app/lobby/"+requestedId+"/joinLobby", {} );
        // socket.send("/app/joinLobby", {"lobbyId": requestedId} );
        history.push('/waitingroom/'+requestedId);
      }
      else{
        alert("You already joined this lobby!");
      }
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