import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from 'react';
import "styles/views/Waitingroom.scss";
import SocketConnection from 'helpers/socketConnection';
import {useHistory, useParams} from 'react-router-dom';
import {api, handleError} from 'helpers/api';
import {BsArrowRightShort} from "react-icons/bs";

const Waitingroom = () => {
    let lobbyId = useParams().id;
    let gameId;

    const startGameCallback = (response) => {
        gameId = response.gameId;
        sessionStorage.setItem("gameId", gameId)
        history.push('/game/'+gameId);
    }



    const [ownUsername, setOwnUsername] = useState(null);
    const [users, setUsers] = useState(null);
    const [gameMaster, setGameMaster] = useState(null);
    const [maxSize, setMaxSize] = useState(null);
    const [currentSize, setCurrentSize] = useState(null);
    const history = useHistory();

    function goToGame(){
        //starts game
        SocketConnection.send("/app/game", {"lobbyId": lobbyId}); 

    }
    function userJoinedCallback(response) {
        setUsers(response)
        setCurrentSize(response.length)
    }

    function userLeftCallback(response) {
        console.log(response)
    }

    function receiveErrorCallback(response) {
        console.log(response)
    }

    function goToURL(response){
      history.push('/game/'+lobbyId); //gameId oder lobbyId?
    }

    
    //fetch all user-data for this waitingroom
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
          async function fetchData() {
            try {
              const response = await api.get("/lobby", {headers:{Authorization:sessionStorage.getItem('token')}});
              console.log(response);
              const id = sessionStorage.getItem("id")
              const responseUser = await api.get(`/users/${id}`);//actual user on the page.
              setOwnUsername(responseUser.data.username);
              setMaxSize(response.data[0].maxSize)
              setCurrentSize(response.data[0].players.length)
              for (let i in response.data) {
                
                if (response.data[i].lobbyId==lobbyId){
                    setUsers(response.data[i].players);
                    setGameMaster(response.data[i].players[0].username);
                    sessionStorage.setItem("gameMaster", gameMaster);
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
    let usersCounted=0;
    for (let i in users){
        usersCounted+=1;
    }

    let gameBox;
    if (usersCounted!=maxSize){// first look, how many players can join the game!
        gameBox = (
            <div>Wait until there are enough users in the waiting room. Currently: {currentSize}/{maxSize}</div>
            
        );
    } else{
        goToGame();
    }
    
    useEffect(() => {
        SocketConnection.subscribe("/users/queue/messages", goToURL);
        SocketConnection.subscribe("/lobby/"+lobbyId+"/userJoined", userJoinedCallback)
        SocketConnection.subscribe("/lobby/"+lobbyId+"/userLeft", userLeftCallback)
        SocketConnection.subscribe("/lobby/"+lobbyId+"/startGame", startGameCallback)
        SocketConnection.connect(sessionStorage.getItem('token'));
    },[])


    return (
        <BaseContainer className="waitingroom container">
             <h2 className = "waitingroom label">Waitingroom</h2> 
             <div className = "waitingroom Url">Want to invite Friends? Tell them to join Game {sessionStorage.getItem('lobbyId')}: (Dashboard <BsArrowRightShort/> Join Game <BsArrowRightShort/> Game {sessionStorage.getItem('lobbyId')}).</div>
             <div className = "waitingroom content">{content}</div>
             <div className = "waitingroom gameBox">{gameBox}</div>
                
        </BaseContainer>
    );
}


export default Waitingroom;