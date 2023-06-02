import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({Component}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('TOKEN_KEY'));
    if(isLoggedIn){
        const decoded = jwt_decode(isLoggedIn);
        let date = new Date();
        let jwtDate = new Date(decoded.exp * 1000);
        if (Date.now() >= decoded.exp * 1000) {
            alert("session expired")
            localStorage.removeItem("TOKEN_KEY");
            location.reload()
        }
    }
   
    const checkUserToken = () => {
        if (!isLoggedIn) {  
        navigate("/authentication/sign-in/basic")
        return;
        }
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);
       
    return (
        <React.Fragment>
           <Component/>
        </React.Fragment>
    );
}
export default ProtectedRoute;