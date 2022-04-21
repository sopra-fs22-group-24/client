import React from 'react';
import {useHistory} from 'react-router-dom';
import 'styles/views/Dashboard.scss';
import BaseContainer from "components/ui/BaseContainer";
import {Button} from 'components/ui/SquareButton';
import {Circle} from "../ui/Circle";
import SocketConnection from 'helpers/socketConnection';

const Dashboard = props => {
    var socket = new SocketConnection();
    socket.subscribe("/users/queue/messages", goToURL);
    socket.connect(localStorage.getItem('token'));
      //await new Promise(resolve => setTimeout(resolve, 5000));
      //localStorage.setItem('socket', socket);
      //console.log(socket);
      //console.log(localStorage.getItem('socket'));
    const history = useHistory();
    let localUsername = localStorage.getItem("username");
    let initial = localUsername[0];

    function goToGame() {

        console.log(socket);
        //socket.subscribe("/users/queue/messages", goToGame2);
        socket.send("/app/createLobby");
       
        
    }
    function goToURL(response){
        console.log(response);
        history.push('/waitingroom/'+response.lobbyId);
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
                    {initial}
                </Circle>
            </div>
            <div className="dashboard container">
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