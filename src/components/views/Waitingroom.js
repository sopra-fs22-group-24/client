import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from 'react';
import "styles/views/Waitingroom.scss";
import SocketConnection from 'helpers/socketConnection';
import {useHistory, useParams} from 'react-router-dom';
import {api, handleError} from 'helpers/api';
import socket from "helpers/socketConnection"
import {Box} from "../ui/Box";

const Waitingroom = () => {
    //socketconnection
    let lobbyId = useParams().id;
    let gameId;

    const startGameCallback = (response) => {
        console.log("/lobby/"+lobbyId+"/startGame")
        console.log(response)
        // Don't use state or else the whole component will reload and you have to reconnect
        gameId = response.gameId;
        localStorage.setItem("gameId", gameId)
        history.push('/game/'+gameId);
        console.log("hello")
    }



    const [ownUsername, setOwnUsername] = useState(null);
    const [users, setUsers] = useState(null);
    const [gameMaster, setGameMaster] = useState(null);

    const history = useHistory();

    function goToGame(id){
        //starts game
        socket.send("/app/game", {"lobbyId": lobbyId})
        //if (gameMaster==ownUsername){
            //socket.send("/app/lobby/"+id+"/leaveLobby", {});
        //}

    }
    function userJoinedCallback(response) {
        console.log(response)
    }

    function userLeftCallback(response) {
        console.log(response)
    }

    function receiveErrorCallback(response) {
        console.log(response)
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
                
                if (response.data[i].lobbyId==lobbyId){
                    setUsers(response.data[i].players);
                    setGameMaster(response.data[i].players[0].username);
                    localStorage.setItem("gameMaster", gameMaster);
                    // let usersCounted=0;
                    // for (let j in response.data[i].players){
                    //     usersCounted+=1;
                    // }
                    // console.log("Users in Lobby:");
                    // console.log(usersCounted);
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
    console.log("GameMaster:");
    console.log(gameMaster);
    console.log("Own Username:");
    console.log(ownUsername);
    console.log("Users in Lobby:");
    console.log(usersCounted);
    console.log(usersCounted!=4);
    //console.log(users.length);

    let gameBox;
    if (usersCounted!=1){
        gameBox = (
            <div>Refresh this page regularly until you are 4 users joining the lobby. Click on Start Button, as soon it appears.</div>
        );
    } else{
        gameBox = (
        <Box
             className = "waitingroom field"
             disabled={true}
             onClick={() => goToGame(gameId)}
             >
                 Start Game
             </Box>
        );
    }
    
    useEffect(() => {
        socket = new SocketConnection();
        socket.subscribe("/users/queue/messages", goToURL);
        socket.subscribe("/lobby/"+lobbyId+"/userJoined", userJoinedCallback)
        socket.subscribe("/lobby/"+lobbyId+"/userLeft", userLeftCallback)
        socket.subscribe("/lobby/"+lobbyId+"/startGame", startGameCallback)
        //socket.subscribe("/users/queue/error", receiveErrorCallback)
        socket.connect(localStorage.getItem('token'));
    },[])


    setInterval(function(){
        window.location.reload(1);
      }, 30000);


    return (
        <BaseContainer className="waitingroom container">
             <h2 className = "waitingroom label">Waitingroom</h2> 
             <div className = "waitingroom Url">Invite Friends: localhost:3000/waitingroom/{localStorage.getItem('gameId')}</div>
             <div className = "waitingroom content">{content}</div>
             <div className = "waitingroom gameBox">{gameBox}</div>
                
        </BaseContainer>
    );
}


export default Waitingroom;