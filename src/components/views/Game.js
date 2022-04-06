//import React, {useState} from 'react';
//import {api, handleError} from 'helpers/api';
//import User from 'models/User';
//import {useHistory} from 'react-router-dom';

import {NumericCard} from 'components/ui/NumericCard';
import {SpecialCard} from 'components/ui/SpecialCard';
import 'styles/views/Game.scss';
//import BaseContainer from "components/ui/BaseContainer";
//import PropTypes from "prop-types";


const Game = props => {

  return ( 
    <div className="game">
      <NumericCard>
        <div className="numericcard green">
        <div className="numericcard upper">9</div>
        <div className="numericcard middle">9</div>
        <div className="numericcard lower">9</div>
        </div>
      </NumericCard>

      <NumericCard>
        <div className="numericcard yellow">
        <div className="numericcard upper">9</div>
        <div className="numericcard middle">9</div>
        <div className="numericcard lower">9</div>
        </div>
      </NumericCard>

      <NumericCard>
        <div className="numericcard red">
        <div className="numericcard upper">9</div>
        <div className="numericcard middle">9</div>
        <div className="numericcard lower">9</div>
        </div>
      </NumericCard>

      <NumericCard>
        <div className="numericcard blue">
        <div className="numericcard upper">9</div>
        <div className="numericcard middle">9</div>
        <div className="numericcard lower">9</div>
        </div>
      </NumericCard>
      
      <SpecialCard>
        <div className="specialcard green">
        
        <div className="specialcard middle">EXTREME HIT</div>
        
        </div>
        
      </SpecialCard>
      </div>
      
  );
};


export default Game;
