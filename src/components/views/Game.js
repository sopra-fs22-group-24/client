//import React, {useState} from 'react';
//import {api, handleError} from 'helpers/api';
//import User from 'models/User';
//import {useHistory} from 'react-router-dom';
import {NumGreenCard} from 'components/ui/NumGreenCard';
import {NumRedCard} from 'components/ui/NumRedCard';
import {NumBlueCard} from 'components/ui/NumBlueCard';
import {NumYellowCard} from 'components/ui/NumYellowCard';
import 'styles/views/Game.scss';
//import BaseContainer from "components/ui/BaseContainer";
//import PropTypes from "prop-types";


const Game = props => {

  return ( 
    <div className="game">
      <NumGreenCard>
        <div className="numgreencard form">
        <div className="numgreencard upper">9</div>
        <div className="numgreencard middle">9</div>
        <div className="numgreencard lower">9</div>
        </div>
        
      </NumGreenCard>
      <NumRedCard>
        <div className="numredcard form">
        <div className="numredcard upper">7</div>
        <div className="numredcard middle">7</div>
        <div className="numredcard lower">7</div>
        </div>
        
      </NumRedCard>
      <NumBlueCard>
        <div className="numbluecard form">
        <div className="numbluecard upper">7</div>
        <div className="numbluecard middle">7</div>
        <div className="numbluecard lower">7</div>
        </div>
        
      </NumBlueCard>
      <NumYellowCard>
        <div className="numyellowcard form">
        <div className="numyellowcard upper">7</div>
        <div className="numyellowcard middle">7</div>
        <div className="numyellowcard lower">7</div>
        </div>
        
      </NumYellowCard>
      </div>
      
  );
};


export default Game;
