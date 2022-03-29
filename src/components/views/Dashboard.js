import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import 'styles/views/Dashboard.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Button} from 'components/ui/SquareButton';



const Dashboard = props => {
    const history = useHistory();


    function goToGame() {
        history.push('/game');
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

    return (
        <BaseContainer>
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
                            onClick={()=> goToGame()}
                        >
                            New Game
                        </Button>
                    </div>
                </div>
                    <div className = "dashboard button-container">
                    <div>

                        <Button
                            onClick={()=> goToRules()}
                        >
                            Rules
                        </Button> {'         '}
                        <Button
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