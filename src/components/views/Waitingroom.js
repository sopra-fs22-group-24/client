//import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
import "styles/views/Waitingroom.scss";
//import SocketConnection from 'helpers/socketConnection';


const Waitingroom = () => {

    return (
        <BaseContainer className="waitingroom container">
            <h2>Waitingroom</h2>
            {/* Users: Profile picture, names, remained cards */}
            <div className="game ownUser">
                    <Circle>
                        me
                    </Circle>
                    <div className="game bottomComment"> Me  </div>
                <div className="game Enemy">
                <Circle>
                   1st 
                </Circle>
                <div className="game bottomComment"> Enemy1  </div>

                    <div className="game Enemy">
                    <Circle>
                    2nd
                    </Circle>
                    <div className="game bottomComment"> Enemy2  </div>
                    </div>
                </div>
            </div>

            
        </BaseContainer>
    );
}


export default Waitingroom;