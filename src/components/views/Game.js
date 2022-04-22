import {NumericCard} from 'components/ui/NumericCard';
import {SpecialCard} from 'components/ui/SpecialCard';
import {Launcher} from 'components/ui/Launcher';
import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
import SocketConnection from "../../helpers/socketConnection";
import PropTypes from "prop-types";
import { GoPerson } from "react-icons/go";
import React from "react";


const Game = props => {
    var socket = new SocketConnection();
    socket.connect(localStorage.getItem('token'));

    function getNewCards(){
        socket.get("/game/{gameId}/drawCard")
    }

    const hand = {}

  return ( 
    <BaseContainer>
        <div className= "game enemyContainer">
            <div className= "enemy">
                <GoPerson/>
                Susie
                <div className = "container">
                    5 cards
                </div>
            </div>
            <div className= "enemy">
                <GoPerson/>
                Peter
                <div className = "container">
                    4 cards
                </div>
            </div>
            <div className= "enemy">
                <GoPerson/>
                Joe
                <div className = "container">
                    3 cards
                </div>
            </div>
        </div>

      <div className="game container">
        {/* Buttons */}
        <div className="game launcher">
        <Launcher onClick={() => getNewCards()}>
             Launch
        </Launcher>
        </div>

        <div className="game middleCard">
          <NumericCard>
            <div className="numericcard red">
            </div>
          </NumericCard>
        </div>


    </div>
        <div className = "game playerContainer">
            <div className="game ownUser">
                <Circle>
                    me
                </Circle>
            </div>
            <div claseName = "game handContainer">
                <div className="game firstOwnCard">
                    <NumericCard>
                        <div className="numericcard green">
                        </div>
                    </NumericCard>

                    <div className="game nextCards">
                        <NumericCard>
                            <div className="numericcard red">
                            </div>
                        </NumericCard>

                        <div className="game nextCards">
                            <NumericCard>
                                <div className="numericcard red">
                                </div>
                            </NumericCard>

                            <div className="game nextCards">
                                <NumericCard>
                                    <div className="numericcard yellow">
                                    </div>
                                </NumericCard>

                                <div className="game nextCards">
                                    <NumericCard>
                                        <div className="numericcard blue">
                                        </div>
                                    </NumericCard>

                                    <div className="game nextCards">
                                        <NumericCard>
                                            <div className="numericcard green">
                                            </div>
                                        </NumericCard>

                                        <div className="game nextCards">
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
            <div className = "game buttonContainer">
                <div>
                    <Button
                        width ="100px">
                        UNO
                    </Button>
                </div>
                {'     '}
                <div>
                    <Button
                        width ="100px">
                        PROTEST
                    </Button>
                </div>

            </div>

        </div>
    </BaseContainer>

    
    
      
      
  );
};


export default Game;
