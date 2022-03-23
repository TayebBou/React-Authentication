import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { API_KEY } from "../../config/constants";
import { authActions } from "../../config/stateSlices/authSlice";


export const changePassword = (token: string | null | undefined, enteredNewPassword: string | undefined, navigate: NavigateFunction, dispatch: Dispatch<any>) => {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
        method : 'POST',
        body : JSON.stringify({
        idToken: token,
        password: enteredNewPassword,
        returnSecureToken: false
        }),
        headers : {
        "Content-Type" : "application/json"
        }
    }).then(res => {
        if(res.ok) {
            navigate('/', {replace: true});
        } else {
            res.json().then(data => {
            let errorMessage = 'Password not valid!';
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            dispatch(authActions.setError(errorMessage));
            })
        }
    })
}