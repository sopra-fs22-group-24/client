import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import {Circle} from "../ui/Circle";


const UserProfile = () => {

    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [score, setScore] = useState(null);
    const [gamesPlayed, setGamesPlayed] = useState(null);
    const [gamesWon, setGamesWon] = useState(null);
    const [picture, setPicture] = useState(null);
    const [stringPicture, setStringPicture] = useState(null);
    let localUsername = localStorage.getItem("username");
    //let initial = localUsername[0];

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

    let content = (
        <div className="profile">
            <div className="profile container">
                <div className="profile form">
                    <Circle>
                        {/* {initial} */}
                        Me
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
                            onClick={() => goToDashboard()}
                            >
                            Back
                        </Button> {'     '}
                        <Button
                            width="100px"
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    function readFileAsString() {
        var files = this.files;
        if (files.length === 0) {
            console.log('No file is selected');
            return;
        }
    
        var reader = new FileReader();
        reader.onload = function(event) {
            console.log('File content:', event.target.result);
        };
        reader.readAsText(files[0]);
    }
        

    const loadPicture = async () => {
        try {
            
            // console.log(document.getElementById('pictureInput').files[0]);
            
            setPicture(document.getElementById('pictureInput').files);

            if (picture.length === 0) {
                console.log('No file is selected');
                return;
            }
        
            var reader = new FileReader();
            reader.onloadend = function() {
                //console.log("finish");
                //console.log('RESULT', reader.result);
                //console.log(reader.result);
                setStringPicture(reader.result);
            }
            //console.log("start");
            //console.log(reader.readAsDataURL(document.getElementById('pictureInput').files[0]));
            reader.readAsDataURL(document.getElementById('pictureInput').files[0]);         
            
            

        } catch (error) {
          alert(`Something went wrong while loading picture: \n${handleError(error)}`);
        }
    };
    console.log("Picture as String:");
    console.log(stringPicture);

 

 
    return (
        <BaseContainer>
            <div className="profile container">
                
                {content}
                <h3>Profilbild ändern:</h3>
                <input type="file" id="pictureInput" />
                <button 
                    type="submit"
                    onClick={() => loadPicture()}>
                    Submit
                    </button>
            </div>
        </BaseContainer>
    );
}

export default UserProfile;