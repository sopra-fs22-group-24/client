import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import 'styles/views/Dashboard.scss';
import BaseContainer from "components/ui/BaseContainer";
import {Circle} from "../ui/Circle";
import {GiCardPlay} from "react-icons/gi";
import {BsPerson} from "react-icons/bs";
import SocketConnection from 'helpers/socketConnection';

const Dashboard = props => {
    const timeout = setTimeout(noMoreTime, 600000);//calls function noMoreTime after 10 minutes
    const history = useHistory();
    let lobbyId;

    function noMoreTime(){
        sessionStorage.removeItem('token');
        history.push('/login');
    }


    function goToGame(maxSize){
        SocketConnection.subscribe("/users/queue/joinLobby", joinLobbyCallback);
        SocketConnection.send("/app/createLobby",{"maxSize": maxSize});
    }

    const joinLobbyCallback = (response) => {
        lobbyId = response.lobbyId;
        sessionStorage.setItem('lobbyId',lobbyId);
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

    useEffect(() => {
        SocketConnection.connect(sessionStorage.getItem('token'));
    },[])

    return (
        <BaseContainer className="dashboard container">
            <div className="dashboard profile-container">
                <Circle
                    onClick={() => goToProfile()}
                >
                    <BsPerson fontSize="100px"/>
                </Circle>
            </div>
            <div className="dashboard fixed">
                <div 
                    className="dashboard overviewLobby"
                    onClick={() => goToLobby()}>
                    Join Game 
                </div>
                <div 
                    className="dashboard overviewGame2"
                    onClick={() => goToGame(2)}>
                    2 Player
                </div>
                <div 
                    className="dashboard overviewGame3"
                    onClick={() => goToGame(3)}> 
                    3 Player
                </div>
                <div 
                    className="dashboard overviewGame4"
                    onClick={() => goToGame(4)}>
                    4 Player
                </div>
                <div 
                    className="dashboard overviewGame">
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

            </div>
            
            
                    
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Dashboard;