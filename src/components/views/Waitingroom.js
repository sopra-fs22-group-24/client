import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from 'react';
import "styles/views/Waitingroom.scss";
import SocketConnection from 'helpers/socketConnection';
import {useHistory, useParams} from 'react-router-dom';
import {api, handleError} from 'helpers/api';
import {Box} from "../ui/Box";

const Waitingroom = () => {
    let lobbyId = useParams().id;
    let gameId;

    const startGameCallback = (response) => {
        // console.log("/lobby/"+lobbyId+"/startGame")
        // console.log(response)
        // Don't use state or else the whole component will reload and you have to reconnect
        gameId = response.gameId;
        localStorage.setItem("gameId", gameId)
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
        //SocketConnection.send("/app/game", {"lobbyId": lobbyId});
        SocketConnection.send("/app/game", {"lobbyId": lobbyId}); //gameId oder lobbyId?
        //history.push('/game/'+lobbyId); //gameId oder lobbyId?
        //if (gameMaster==ownUsername){
            //SocketConnection.send("/app/lobby/"+id+"/leaveLobby", {});
        //}

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
              const response = await api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}});
              console.log(response);
              const id = localStorage.getItem("id")
              const responseUser = await api.get(`/users/${id}`);//actual user on the page.
              setOwnUsername(responseUser.data.username);
              setMaxSize(response.data[0].maxSize)
              setCurrentSize(response.data[0].players.length)
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
    /* console.log("GameMaster:");
    console.log(gameMaster);
    console.log("Own Username:");
    console.log(ownUsername);
    console.log("Users in Lobby:");
    console.log(usersCounted);
    console.log(usersCounted!=4);
    //console.log(users.length); */

    let gameBox;
    if (usersCounted!=maxSize){// first look, how many players can join the game!
        gameBox = (
            <div>Wait until there are enough user in the waiting room. Currently: {currentSize}/{maxSize}</div>
            
        );
    } else{
        goToGame();
    }
    
    useEffect(() => {
        SocketConnection.subscribe("/users/queue/messages", goToURL);
        SocketConnection.subscribe("/lobby/"+lobbyId+"/userJoined", userJoinedCallback)
        SocketConnection.subscribe("/lobby/"+lobbyId+"/userLeft", userLeftCallback)
        SocketConnection.subscribe("/lobby/"+lobbyId+"/startGame", startGameCallback)
        //SocketConnection.subscribe("/users/queue/error", receiveErrorCallback)
        SocketConnection.connect(localStorage.getItem('token'));
    },[])


    // setInterval(function(){
    //     window.location.reload(1);
    //   }, 30000);


    return (
        <BaseContainer className="waitingroom container">
             {/*<meta http-equiv="refresh" content="30"></meta>*/}
             <h2 className = "waitingroom label">Waitingroom</h2> 
             <div className = "waitingroom Url">Invite Friends: localhost:3000/waitingroom/{localStorage.getItem('lobbyId')}</div>
             <div className = "waitingroom content">{content}</div>
             <div className = "waitingroom gameBox">{gameBox}</div>
                
        </BaseContainer>
    );
}


export default Waitingroom;