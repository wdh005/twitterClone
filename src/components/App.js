import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../myFirebase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            //로그인 로그아웃 & 초기화 될 때 발동 된다
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };
    return (
        <>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                />
            ) : (
                "Initializing ....."
            )}
        </>
    );
}

export default App;
