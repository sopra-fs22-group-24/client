import BaseContainer from "components/ui/BaseContainer";
import {useHistory} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import SocketConnection from 'helpers/socketConnection';
import {Circle} from "../ui/Circle";
import {Box} from "../ui/Box";
import {BsPerson} from "react-icons/bs";
import "styles/views/Lobby.scss";



const Lobby = () => {
    SocketConnection.connect(sessionStorage.getItem('token'));
    const [lobbies, setLobbies] = useState(null);
    const history = useHistory();
    //const timeout = setTimeout(noMoreTime, 600000);//calls function noMoreTime after 10 minutes
    const [ownUsername, setOwnUsername] = useState(null);
    
    function noMoreTime(){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('id');
      history.push('/login');
    }
    

    //fetch all lobby-data
    useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
      async function fetchData() {
        try {
           const response = await api.get("/lobby", {headers:{Authorization:sessionStorage.getItem('token')}});
           const id = sessionStorage.getItem("id")
           const responseUser = await api.get(`/users/${id}`);
           setOwnUsername(responseUser.data.username);
          
          let open = [];
          let count = 0;
          for (let j in response.data){
            if(response.data[j].players.length!=4){
              open[count] = response.data[j];
              count +=1;
            }
          }
          console.log(open);
          setLobbies(open);
          
        } catch (error) {
          console.error(`Something went wrong while fetching the lobbies: \n${handleError(error)}`);
          console.error("Details:", error);
          alert("Something went wrong while fetching the lobbies! See the console for details.");
        }
      }
      fetchData();}, []
    );

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
                      <div className="lobby maxSize">Size: {lobby.players.length}/{lobby.maxSize}</div>
                  </Box>
                </div> 
              ))}         

          </ul>  
       </div>
    );
  } 
  
  function goToGame(maxSize){
    SocketConnection.subscribe("/users/queue/joinLobby", joinLobbyCallback);
    SocketConnection.send("/app/createLobby",{"maxSize": maxSize});
    
}

  const joinLobbyCallback = (response) => {
    let lobbyId = response.lobbyId;
    sessionStorage.setItem('lobbyId',lobbyId);
    history.push('/waitingroom/'+lobbyId);
  }

    


  async function goToLobby(requestedId){
    try{
      console.log(lobbies);
      SocketConnection.subscribe("/users/queue/joinLobby", joinLobbyCallback);
      SocketConnection.send("/app/lobby/"+requestedId+"/joinLobby", {} );
      console.log(lobbies);
    } catch (error) {
      console.error(`Something went wrong while joining the lobbies: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("Something went wrong while joining the lobby! See the console for details.");
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
              <BsPerson fontSize="100px"/>
          </Circle>    
        </div>
        <div className="lobby container">
          <div className="lobby form">
            <h2 className = "lobby title">Games to join:</h2>
            {content}
            <Box
                className = "lobby gameButton"
                onClick={() => goToGame(2)}
            >
                New Game: 2 Players
            </Box>
            <Box
                className = "lobby gameButton"
                onClick={() => goToGame(3)}
            >
                New Game: 3 Players
            </Box>
            <Box
                className = "lobby gameButton"
                onClick={() => goToGame(4)}
            >
                New Game: 4 Players
            </Box>
            
            
          </div>
          
        </div>
        
      </BaseContainer>
      
  );
}


export default Lobby; 