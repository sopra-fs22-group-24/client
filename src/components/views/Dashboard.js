import {useHistory} from 'react-router-dom';
import React, {useState} from 'react';
import 'styles/views/Dashboard.scss';
import BaseContainer from "components/ui/BaseContainer";
import {Button} from 'components/ui/SquareButton';
import {Circle} from "../ui/Circle";
import SocketConnection from 'helpers/socketConnection';

const Dashboard = props => {
    const history = useHistory();
    let gameId;
    
    let localUsername = localStorage.getItem("username");
    var socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));

    function goToGame(){
        socket.send("/app/createLobby",{});
        socket.subscribe("/users/queue/joinLobby", joinLobbyCallback);
        
    }
    

    const joinLobbyCallback = (response) => {
        gameId = response.lobbyId;
        localStorage.setItem('gameId',gameId);
        history.push('/waitingroom/'+gameId);
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
        history.push('/profile');
    }

    return (
        <BaseContainer>
            <div className="dashboard header">
                <Circle
                    onClick={() => goToProfile()}
                >
                    L
                </Circle>
            </div>
            <div className="dashboard container">
                <h1>Welcome {localUsername} !</h1>
                <div className="dashboard form">
                    <div className="dashboard button-container">
                        <div>
                            <Button
                                onClick={() => goToLobby()}
                            >
                                Join Game
                            </Button> {'     '}
                            <Button
                                onClick={() => goToGame()}
                            >
                                New Game
                            </Button>
                        </div>
                    </div>
                    <div className="dashboard button-container">
                        <div>

                            <Button
                                className="color-bottom"
                                onClick={() => goToRules()}
                            >
                                Rules
                            </Button> {'         '}
                            <Button
                                className="color-bottom"
                                onClick={() => goToRanking()}
                            >
                                Ranking
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Dashboard;