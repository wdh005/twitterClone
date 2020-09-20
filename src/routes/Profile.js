import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../myFirebase";

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};
export default Profile;
