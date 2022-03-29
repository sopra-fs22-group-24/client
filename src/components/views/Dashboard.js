import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import 'styles/views/Dashboard.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
//import styled from "styled-components";

const FormField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Dashboard = props => {
    const history = useHistory();



 function goToGame(){
     history.push('/game');
 }
    function goToLobby(){
        history.push('/lobby');
    }
    function goToRanking(){
        history.push('/ranking');
    }
    function goToRules(){
        history.push('/rules');
    }

    return (
        <BaseContainer>
            <div className="dashboard container">
                <div className="dashboard form">
                    <div>
                        <button
                        onClick={goToLobby()}
                    >
                        Join Game
                    </button>
                        <button
                            onClick={goToRanking()}
                        >
                            Ranking
                        </button>
                    </div>
                    <div>
                        <button
                        onClick={goToGame()}
                    >
                        New Game
                    </button>
                        <button
                            onClick={goToRules()}
                        >
                            Rules
                        </button>
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