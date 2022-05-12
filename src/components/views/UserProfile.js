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
                console.log(response.data);
                setUsername(response.data.username);
                setGamesPlayed(response.data.gamesPlayed);
                setGamesWon(response.data.gamesWon);
                setScore(response.data.score);
                setPicture(localStorage.getItem('picture'));

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
            <img className = "profile picture"
                src={picture}/>
            <div className="profile container">
                <div className="profile form">
                    <div className="profile properties">Username: {username}</div>
                    <div className="profile line"></div>

                    
                    <div className="profile properties">Games played: {gamesPlayed}</div>
                    <div className="profile line2"></div>

                    <div className="profile properties">Games won: {gamesWon}</div>
                    <div className="profile line3"></div>

                    <div className="profile properties">Score: {score}</div>
                    <div className="profile line4"></div>

                    <div className="profile properties">Change profile picture:</div>
                    <input className="profile button1" type="file" id="pictureInput" />
                    <button 
                        className="profile button1"
                        type="submit"
                        onClick={() => loadPicture()}>
                        Submit
                    </button>

                    
                    
                    
                    
                </div>
            </div>
        </div>
    );

   /*  function readFileAsString() {
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
    } */
        

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
                <Button
                            className="profile backbutton"
                            width="100px"
                            onClick={() => goToDashboard()}
                            >
                            Back
                </Button>

                <Button
                            className="profile logoutbutton"
                            width="100px"
                            onClick={() => logout()}
                        >
                            Logout
                </Button>
                

                
                
            </div>
        </BaseContainer>
    );
}

export default UserProfile;