import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from 'react';
import "styles/views/Waitingroom.scss";
import SocketConnection from 'helpers/socketConnection';
import {useHistory} from 'react-router-dom';
import {api, handleError} from 'helpers/api';

const Waitingroom = () => {
    //socketconnection
    var socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));
    //socket.subscribe("/users/queue/messages", goToURL);

    const [users, setUsers] = useState(null);
    let gameId = localStorage.getItem('gameId');
    
    const history = useHistory();

    // function goToURL(response){
    //     console.log(response);
    //     history.push('/game/'+response.lobbyId);
    // }
    
    //fetch all user-data
    // useEffect(() => {
    // // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    // async function fetchData() {
    //     try {
    //         const response = await api.get("/lobby", {headers:{Authorization:localStorage.getItem('token')}});
    //         console.log(response);
    //         // Get the returned lobbies and update the state
    //         response.forEach(function(item, index, array) {//iteration over all lobbies
    //             if(item.gameId===gameId){ //We want to have the player of the open lobby
    //                 setUsers(item.players);
                    
    //             }
    //         })
    //         setUsers(response.data.gameId);
            
    //     }   catch (error) {
    //         console.error(`Something went wrong while fetching the lobby: \n${handleError(error)}`);
    //         console.error("Details:", error);
    //         alert("Something went wrong while fetching the lobby! See the console for details.");
    //     }
    
    // } fetchData();}, []
    // );

    // console.log(users);



//     
//       
//          
//       }
//       fetchData();}, []
//     );
//   console.log(lobbies);

//     // lobby-users displayed correctly   
//   let users; 

//   if (lobbies) {
//     users = (
//        <div className="lobby">
//           <ul className="lobby lobbyList"> 
//             {lobbies.map(lobby => (
//                 <div>
//                   <Box 
//                       className = "lobby field"
//                       onClick={() => goToLobby(lobby.lobbyId)}>
                        
//                       <div className ="lobby labelLeft">Game {lobby.lobbyId}</div>  
//                       <div className ="lobby labelRight">Players joined: 
//                       {lobby.players.map(player => (<div>{player.username}</div>))}</div>
//                   </Box>
                    
//                    {/*  <div>Players joined:</div>
//                     {lobby.players.map(player => (
//                       <div>{player.username}</div>
//                     ))} */}
                    
                    
                     
                  
//                 </div> 
//               ))}         

//           </ul>  
//        </div>
//     );
//   } 
  
//   function goToLobby(id){
//     history.push('/waitingroom/'+id);

//   }
    return (
        <BaseContainer className="waitingroom container">
            <h2>Waitingroom</h2>
            {/* Users: Profile picture, names, remained cards */}
            <div className="game ownUser">
                    <Circle>
                        me
                    </Circle>
                    <div className="game bottomComment"> Me  </div>
                <div className="game Enemy">
                <Circle>
                   1st 
                </Circle>
                <div className="game bottomComment"> Enemy1  </div>

                    <div className="game Enemy">
                    <Circle>
                    2nd
                    </Circle>
                    <div className="game bottomComment"> Enemy2  </div>
                    </div>
                </div>
            </div>

            
        </BaseContainer>
    );
}


export default Waitingroom;