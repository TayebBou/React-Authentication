import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { API_KEY } from "../../config/constants";
import { authActions } from "../../config/stateSlices/authSlice";


export const changePassword = (token: string | null | undefined, enteredNewPassword: string | undefined, navigate: NavigateFunction, dispatch: Dispatch<any>) => {
    
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
        idToken: token,
        password: enteredNewPassword,
        returnSecureToken: false
    })
    .then(res => {
        navigate('/', {replace: true});
    })
    .catch(err => {
        let errorMessage = 'Authentication failed!';
        if(err.response) {
          if(err.response.data.error.message) {
            errorMessage = err.response.data.error.message;
          }
        } else if(err.request) {
          errorMessage = 'Request error!';
        } else {
          if(err && err.message) {
            errorMessage = err.message;
          }
        }
        dispatch(authActions.setError(errorMessage));
    })

    // fetch methode

    // fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
    //     method : 'POST',
    //     body : JSON.stringify({
    //     idToken: token,
    //     password: enteredNewPassword,
    //     returnSecureToken: false
    //     }),
    //     headers : {
    //     "Content-Type" : "application/json"
    //     }
    // }).then(res => {
    //     if(res.ok) {
    //         navigate('/', {replace: true});
    //     } else {
    //         res.json().then(data => {
    //         let errorMessage = 'Password not valid!';
    //         if(data && data.error && data.error.message){
    //             errorMessage = data.error.message;
    //         }
    //         dispatch(authActions.setError(errorMessage));
    //         })
    //     }
    // })
}