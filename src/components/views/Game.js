import {NumericCard} from 'components/ui/NumericCard';
import {SpecialCard} from 'components/ui/SpecialCard';
import {Launcher} from 'components/ui/Launcher';
import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
//import BaseContainer from "components/ui/BaseContainer";
//import PropTypes from "prop-types";


const Game = props => {

  return ( 
    <BaseContainer>
      <div className="game container">
        {/* Buttons */}
        <div className="game launcher">
        <div className="game label">LAUNCH</div>
        <Launcher>
          <div className="launcher"></div> 
        </Launcher>
        </div>

        <div className="game unoButton">
          <Button
            width ="100px">
            UNO
          </Button>
        </div>

        <div className="game protestButton">
          <Button
            width ="100px">
            PROTEST
          </Button>
        </div>

        {/* Users: Profile picture, names, remained cards */}
        <div className="game ownUser">
                <Circle>
                    me
                </Circle>
        </div>
        <div className="game firstEnemy">
            <Circle>
                1st
            </Circle>
            <div className="game bottomComment"> Enemy1  </div>
            <div className="game topComment">5 cards</div>

            <div className="game nextEnemy">
            <Circle>
                2nd
            </Circle>
            <div className="game bottomComment"> Enemy2  </div>
            <div className="game topComment">7 cards</div>

              <div className="game nextEnemy">
              <Circle>
                  3rd
              </Circle>
              <div className="game bottomComment"> Enemy3  </div>
              <div className="game topComment">3 cards</div>
              </div>
            </div>
        </div>

        {/* Cards */}
        <div className="game middleCard">
          <NumericCard>
            <div className="numericcard red">
            <div className="numericcard upper">9</div>
            <div className="numericcard middle">9</div>
            <div className="numericcard lower">9</div>
            </div>
          </NumericCard>
        </div>

        <div className="game firstOwnCard">
          <NumericCard>
            <div className="numericcard green">
            <div className="numericcard upper">9</div>
            <div className="numericcard middle">9</div>
            <div className="numericcard lower">9</div>
            </div>
          </NumericCard>
            
            <div className="game nextCards">
            <NumericCard>
              <div className="numericcard red">
              <div className="numericcard upper">9</div>
              <div className="numericcard middle">9</div>
              <div className="numericcard lower">9</div>
              </div>
            </NumericCard>

              <div className="game nextCards">
              <NumericCard>
                <div className="numericcard red">
                <div className="numericcard upper">3</div>
                <div className="numericcard middle">3</div>
                <div className="numericcard lower">3</div>
                </div>
              </NumericCard>

                <div className="game nextCards">
                <NumericCard>
                  <div className="numericcard yellow">
                  <div className="numericcard upper">2</div>
                  <div className="numericcard middle">2</div>
                  <div className="numericcard lower">2</div>
                  </div>
                </NumericCard>

                  <div className="game nextCards">
                  <NumericCard>
                    <div className="numericcard blue">
                    <div className="numericcard upper">9</div>
                    <div className="numericcard middle">9</div>
                    <div className="numericcard lower">9</div>
                    </div>
                  </NumericCard>

                      <div className="game nextCards">
                      <NumericCard>
                        <div className="numericcard green">
                        <div className="numericcard upper">1</div>
                        <div className="numericcard middle">1</div>
                        <div className="numericcard lower">1</div>
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

        <div className="game comments">
          BAM!!
        </div>

        
    </div>
    </BaseContainer>

    
    
      
      
  );
};


export default Game;
