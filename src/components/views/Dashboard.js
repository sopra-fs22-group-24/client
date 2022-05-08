import React from 'react';
import {useHistory} from 'react-router-dom';
import 'styles/views/Dashboard.scss';
import BaseContainer from "components/ui/BaseContainer";
import {Button} from 'components/ui/SquareButton';
import {Circle} from "../ui/Circle";
import SocketConnection from 'helpers/socketConnection';
import {GiCardPlay} from "react-icons/gi";

const Dashboard = props => {
    
    const history = useHistory();
    let lobbyId;
    let localUsername = localStorage.getItem("username");
    let initial = localUsername[0];
    
    var socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));

    function goToGame(){
        socket.send("/app/createLobby",{});
        socket.subscribe("/users/queue/joinLobby", joinLobbyCallback);
        
    }

    const joinLobbyCallback = (response) => {
        lobbyId = response.lobbyId;
        localStorage.setItem('lobbyId',lobbyId);
        history.push('/waitingroom/'+lobbyId);
    }

    function goToLobby() {
        history.push('/lobby');
    }

    function goToRanking() {
        history.push('/ranking');
    }

    function goToRules() {
        history.push('/rules');
    }

    function goToProfile() {
        history.push('/user');
    }

     

    return (
        <BaseContainer>
            <div className="dashboard profile-container">
                <Circle
                    onClick={() => goToProfile()}
                >
                    {initial}
                </Circle>
            </div>
            <div 
                className="dashboard overviewLobby"
                onClick={() => goToLobby()}>
                Join Game 
            </div>
            <div 
                className="dashboard overviewGame2"
                onClick={() => goToGame()}>
                2 Player
            </div>
            <div 
                className="dashboard overviewGame3"
                onClick={() => goToGame()}>
                3 Player
            </div>
            <div 
                className="dashboard overviewGame4"
                onClick={() => goToGame()}>
                4 Player
            </div>
            <div 
                className="dashboard overviewGame"
                onClick={() => goToGame()}>
                New Game
            </div>
            <div 
                className="dashboard overviewRules"
                onClick={() => goToRules()}>
                Rules
            </div>
            <div 
                className="dashboard overviewRanking"
                onClick={() => goToRanking()}>
                Ranking
            </div>
            <div className="dashboard overview">
                <GiCardPlay/>
            </div>
            

            {/* <div className="dashboard container">
                        <div>
                            
                            <Button
                                    className="dashboard color-bottom"
                                    onClick={() => goToGame()}
                                >
                                    New Game
                            </Button>
                            <Button
                                className="dashboard color-bottom"
                                onClick={() => goToRules()}
                            >
                                Rules
                            </Button> {'         '}
                            <Button
                                className="dashboard color-bottom"
                                onClick={() => goToRanking()}
                            >
                                Ranking
                            </Button>
                        </div>
                        
            </div> */}
                    
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Dashboard;