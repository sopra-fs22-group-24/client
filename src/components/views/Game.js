//import React, {useState} from 'react';
//import {api, handleError} from 'helpers/api';
//import User from 'models/User';
//import {useHistory} from 'react-router-dom';

import {NumericCard} from 'components/ui/NumericCard';
import {SpecialCard} from 'components/ui/SpecialCard';
import {Launcher} from 'components/ui/Launcher';
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
//import BaseContainer from "components/ui/BaseContainer";
//import PropTypes from "prop-types";


const Game = props => {

  return ( 
    <BaseContainer>
      <div className="game container">
        <div className="game launcher">
        <div className="game label">LAUNCH</div>
        <Launcher>
        
          <div className="launcher"></div>
          
        </Launcher>
        </div>
        <div className="game form1">
          
          <NumericCard>
            <div className="numericcard green">
            <div className="numericcard upper">9</div>
            <div className="numericcard middle">9</div>
            <div className="numericcard lower">9</div>
            </div>
          </NumericCard>
            
          
            <div className="game form2">
            <NumericCard>
              <div className="numericcard red">
              <div className="numericcard upper">9</div>
              <div className="numericcard middle">9</div>
              <div className="numericcard lower">9</div>
              </div>
            </NumericCard>
              <div className="game form2">
              <NumericCard>
                <div className="numericcard red">
                <div className="numericcard upper">3</div>
                <div className="numericcard middle">3</div>
                <div className="numericcard lower">3</div>
                </div>
              </NumericCard>
                <div className="game form2">
                <NumericCard>
                  <div className="numericcard yellow">
                  <div className="numericcard upper">2</div>
                  <div className="numericcard middle">2</div>
                  <div className="numericcard lower">2</div>
                  </div>
                </NumericCard>
                  <div className="game form2">
                  <NumericCard>
                    <div className="numericcard blue">
                    <div className="numericcard upper">9</div>
                    <div className="numericcard middle">9</div>
                    <div className="numericcard lower">9</div>
                    </div>
                  </NumericCard>
                      <div className="game form2">
                      <NumericCard>
                        <div className="numericcard green">
                        <div className="numericcard upper">1</div>
                        <div className="numericcard middle">1</div>
                        <div className="numericcard lower">1</div>
                        </div>
                      </NumericCard>
                          <div className="game form2">
                          <SpecialCard>
                            <div className="specialcard blue">
                            <div className="specialcard middle">HIT</div>
                            </div>
                          </SpecialCard>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
    </div>
    </BaseContainer>

    
    
      
      
  );
};


export default Game;
