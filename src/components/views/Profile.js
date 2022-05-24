import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import {Circle} from "../ui/Circle";


const Profile = () => {
    
    //const id = useParams().id;
    const id=1;
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [score, setScore] = useState(null);
    const [gamesPlayed, setGamesPlayed] = useState(null);
    const [gamesWon, setGamesWon] = useState(null);
    

     useEffect(() => {
         async function fetchData() {
             try {
                console.log("hey!");
                const response = await api.get(`/users/${id}`);
                setUsername(response.data.username);
                setGamesPlayed(response.data.gamesPlayed);
                setGamesWon(response.data.gamesWon);
                setScore(response.data.score);



             } catch (error) {
                alert(`Something went wrong\n${handleError(error)}`);
             }
         }
         fetchData();
     }, []);

     console.log(username);


    const logout = () => {
        sessionStorage.removeItem('token');
        history.push('/login');
    }

// //     const goToDashboard = async () => {
// //         history.push(`/dashboard`);
// //     };

     let content = <Spinner/>;

     const initial = username[0];

    if (username) {
      content = (
            <div className="profile">
                <div className="profile container">
                <div className="profile form">
                    <Circle>
                        {initial}
                    </Circle>
                    <h3> </h3>
                    <h3>Username: {username} </h3>
                    <h3>Games played: {gamesPlayed} </h3>
                    <h3>Games won: {gamesWon} </h3>
                    <h3>Score: {score} </h3>
                    <h3> </h3>
                    <div className="button-container">
                <Button
                    width="100px"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
                <Button
                    width="100px"
                    // onClick={() => goToDashboard()}
                >
                    Back
                </Button>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    return (
        <BaseContainer>
           <div className="profile container">
                 {content}
           </div>
       </BaseContainer>
    );
}

export default Profile;