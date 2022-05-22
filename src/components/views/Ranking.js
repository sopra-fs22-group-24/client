import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Ranking.scss";
import {generatePath, Link, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {Circle} from "../ui/Circle";
import {BsFillTrophyFill} from "react-icons/bs";
import {BsPerson} from "react-icons/bs";
import {BsHourglassSplit} from "react-icons/bs";

const Player = (userIndexArray) => {
    const history = useHistory();
    //console.log(userIndexArray.user[0]);//userInfos
    //console.log(userIndexArray.user[1]);//index: where is this user in the user-array
    // let id = user.id;
    // let idShown = user.id;
    let id = userIndexArray.user[1];
    
    let idShown = id;

    if (id ==1 && userIndexArray.user[0].score!=0){
        idShown = <BsFillTrophyFill className = "player first" fontSize="large"/>;
    }
    if (id ==2 && userIndexArray.user[0].score!=0){
        idShown = <BsFillTrophyFill className = "player second" fontSize="large"/>;
    }

    if (id ==3 && userIndexArray.user[0].score!=0){
        idShown = <BsFillTrophyFill className = "player third" fontSize="large"/>;
    }
    if (userIndexArray.user[0].score==0){
        idShown = <BsHourglassSplit fontSize="large"/>; 
    }
    return (
        <div className="player container">
            <div className="player id">{idShown}</div>
            <div className = "player link"> {userIndexArray.user[0].username} </div>
            <div className = "player gamesPlayed"> Games played:{userIndexArray.user[0].gamesPlayed} </div>
            <div className = "player gamesWon"> Games won:{userIndexArray.user[0].gamesWon} </div>
            <div className="player score">Score: {userIndexArray.user[0].score}</div>
        </div>
    )};

Player.propTypes = {
    user: PropTypes.object
};

const Ranking = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);
    let localUsername = localStorage.getItem("username");
    //let initial = localUsername[0];

    const goToDashboard = async () => {
        history.push(`/dashboard`);
    };

    function goToProfile() {
        history.push('/user');
    }

    function goToUser(goId) {
        history.push(`/profile/${goId}`);
    }

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users');

                await new Promise(resolve => setTimeout(resolve, 1000));

                setUsers(response.data);

                // console.log('request to:', response.request.responseURL);
                // console.log('status code:', response.status);
                // console.log('status text:', response.statusText);
                // console.log('requested data:', response.data);
                // console.log(response);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");

            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;

    

    if (users) {
        content = (
            <div className="ranking">
                <ul className="ranking user-list">
                    {users.map((user,index) => (
                        <div><Player user={[user,index]}  /> 
                        {/* key={user.id} */}
                        </div>
                    ))}
                </ul>
                <div className="ranking button-container">
                <Button
                    width="100px"
                    onClick={() => goToDashboard()}
                    className="ranking dash"
                >
                    Dashboard
                </Button>
                </div>
            </div>
        );
    }

    return (
        <BaseContainer>
            <div className="ranking profile-container">
                <Circle
                    onClick={() => goToProfile()}
                >
                    <BsPerson fontSize="100px"/>
                </Circle>
            </div>
            <div className="ranking container">
            <div className="ranking form">
            <h2>Ranking</h2>
            {content}
            </div>
            </div>
        </BaseContainer>
    );
}


export default Ranking;