import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";


const UserProfile = () => {

    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [score, setScore] = useState(null);
    const [gamesPlayed, setGamesPlayed] = useState(null);
    const [gamesWon, setGamesWon] = useState(null);
    const [picture, setPicture] = useState(null);
    const [newPictur,setNewPicture]=useState(null);
    const id = sessionStorage.getItem("id");

    const timeout = setTimeout(noMoreTime, 600000);//calls function noMoreTime after 10 minutes
    
    function noMoreTime(){
        sessionStorage.removeItem('token');
        history.push('/login');
    }
    
    async function fetchData() {
        try {
            
            const response = await api.get(`/users/${id}`);
            setUsername(response.data.username);
            setGamesPlayed(response.data.gamesPlayed);
            setGamesWon(response.data.gamesWon);
            setScore(response.data.score);
        } catch (error) {
            alert(`Something went wrong\n${handleError(error)}`);
        }
    }
    async function fetchProfilePicture() {
        try {
            const response = await api.get(`/users/${id}/picture`);
           setPicture("data:image/jpeg;base64," + response.data)
            
        } catch (error) {
            alert(`Something went wrong fetching the picture\n${handleError(error)}`);
        }
    }
    

    useEffect(() => {
        fetchData();
        fetchProfilePicture();
    }, []);
    

    const logout = () => {
        sessionStorage.removeItem('token');
        history.push('/login');
    }

    const goToDashboard = async () => {
        history.push(`/dashboard`);
    };

      

    
        async function uploadPicture() {
            try {
                setNewPicture(document.getElementById('pictureInput').files[0]);
                let formData = new FormData();
                formData.append("picture",document.getElementById('pictureInput').files[0]  )
                    const id = sessionStorage.getItem("id");
                    await api.post(`/users/${id}/picture`,formData);
                   
                    fetchProfilePicture();
                
               
            } catch (error) {
              alert(`Something went wrong while uploading the picture: \n${handleError(error)}`);
            }
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
                        onClick={() => uploadPicture()}>
                        Submit
                    </button>

                    
                    
                    
                    
                </div>
            </div>
        </div>
    );
 
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