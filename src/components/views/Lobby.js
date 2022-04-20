import BaseContainer from "components/ui/BaseContainer";
import { api } from "helpers/api";
import { Button } from 'components/ui/Button';
import React, { useState } from 'react';
import SocketConnection from 'helpers/socketConnection';
import "styles/views/Profile.scss";


const Lobby = () => {

    const getLobbys = async () => {
        const response = api.get("/lobby", {headers: { Authorization:localStorage.getItem("token") }});
        console.log(response);
    }
    getLobbys();
    return (
        <BaseContainer className="profile container">
            <h2>Lobby</h2>
        </BaseContainer>
    );
}


export default Lobby;