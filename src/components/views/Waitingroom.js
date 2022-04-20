import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Game.scss';
import "styles/views/Waitingroom.scss";
import SocketConnection from 'helpers/socketConnection';


const Waitingroom = () => {
    /* //var users = api.get(lobby/) //get users!!
    var socket = new SocketConnection();
    socket.subscribe("/users/queue/messages", goToGame2);
    socket.connect(localStorage.getItem('token')); */
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
            {/* <Button
              width="100%"
              onClick={() => goToGame2()}
            >
              Go to Game!
            </Button>
             */}
            
        </BaseContainer>
    );
}


export default Waitingroom;