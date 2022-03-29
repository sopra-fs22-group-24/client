import { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import { Button } from 'components/ui/Button';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";


const Profile = () => {

    return (
        <BaseContainer className="profile container">
            <h2>Profile No</h2>
        </BaseContainer>
    );
}


export default Profile;