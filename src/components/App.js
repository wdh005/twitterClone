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
                setUserObj(user);
            } else {
            }
            setInit(true);
        });
    }, []);
    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : (
                "Initializing ....."
            )}
            <footer>&copy; {new Date().getFullYear()} Twitter </footer>
        </>
    );
}

export default App;
