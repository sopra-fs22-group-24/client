//import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
//import 'styles/views/Game.scss';
import "styles/views/Waitingroom.scss";
//import SocketConnection from 'helpers/socketConnection';


const Waitingroom = () => {

    return (
        <BaseContainer className="waitingroom container">
            <h2 className = "waitingroom label">Waitingroom</h2>
            {/* Users: Profile picture, names, remained cards */}
            <div className = "waitingroom Url">Invite Friends: localhost:3000/waitingroom/{localStorage.getItem('gameId')}</div>
            <div className="waitingroom ownUser">
                    <Circle>
                        me
                    </Circle>
                    <div className="waitingroom bottomComment"> Me  </div>
                <div className="waitingroom Enemy">
                <Circle>
                   1st 
                </Circle>
                <div className="waitingroom bottomComment"> Enemy1  </div>

                    <div className="waitingroom Enemy">
                    <Circle>
                    2nd
                    </Circle>
                    <div className="waitingroom bottomComment"> Enemy2  </div>
                    </div>
                </div>
            </div>

            
        </BaseContainer>
    );
}


export default Waitingroom;