import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import {Circle} from "../ui/Circle";


const Profile = () => {

    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [score, setScore] = useState(null);
    const [gamesPlayed, setGamesPlayed] = useState(null);
    const [gamesWon, setGamesWon] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const id = localStorage.getItem("id")
                const response = await api.get(`/users/${id}`);

                setUsername(response.data.username);
                setGamesPlayed(response.data.gamesPlayed);
                setGamesWon(response.data.gamesWon);
                setScore(response.data.score);

            } catch (error) {
                alert(`Something went wrong\n${handleError(error)}`);
            }
        }

        console.log("Userprofil")
        fetchData();
    }, []);


    const logout = () => {
        //const id = localStorage.getItem("id");
        //const requestBody = JSON.stringify({id});
        //api.post('/logout', requestBody);
        localStorage.removeItem('token');
        history.push('/login');
    }

    const goToDashboard = async () => {
        history.push(`/dashboard`);
    };

    //let content = <Spinner/>;

   // if (username) {
     let content = (
            <div className="profile">
                <div className="profile container">
                <div className="profile form">
                    <Circle>
                        L
                    </Circle>
                    <h3>Username: {username} </h3>
                    <h3>Games played: {gamesPlayed} </h3>
                    <h3>Games won: {gamesWon} </h3>
                    <h3>Score: {score} </h3>
                    <div className="button-container">
                <Button
                    width="50%"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
                <Button
                    width="50%"
                    onClick={() => goToDashboard()}
                >
                    Back
                </Button>
                    </div>
                </div>
                </div>
            </div>
        );
    //}

    return (
        <BaseContainer>
            <div className="profile container">
                <h2>This is your profile</h2>
                {content}
            </div>
        </BaseContainer>
    );
}

export default Profile;