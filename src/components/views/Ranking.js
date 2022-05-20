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

const Player = ({user}) => {

    let id = user.id;
    if (id ==1){
        id = <BsFillTrophyFill className = "player first" fontSize="large"/>;
    }
    if (id ==2){
        id = <BsFillTrophyFill className = "player second" fontSize="large"/>;
    }

    if (id ==3){
        id = <BsFillTrophyFill className = "player third" fontSize="large"/>;
    }
    return (
        <div className="player container">
            <div className="player id">{id}</div>
            <Link className = "player link" to={generatePath('/profile/:id', {id}) }> {user.username} </Link>
            <div className="player score">score: {user.score}</div>
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
                    {users.map(user => (
                        <div><Player user={user} key={user.id} /> 
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