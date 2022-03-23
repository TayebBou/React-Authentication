import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { IAuthStates } from "../../shared/models/authStates.model";
import { calculateRemainingTime, RetrieveStoredToken } from "../../shared/utils/auth-utils";
import { API_KEY } from "../constants";

let logoutTimer : NodeJS.Timeout;
const tokenData = RetrieveStoredToken();
if(tokenData) {
  setTimeout(() => authActions.logoutHandler(), tokenData.duration);
}
const initialToken = tokenData?.token;
const initialAuthState : IAuthStates = {
    token : initialToken,
    isLoggedIn : !!initialToken,
    isLogin : true,
    error : null,
    loading : false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState : initialAuthState,
    reducers : {
        switchAuthMode(state:IAuthStates) {
            state.isLogin = !state.isLogin
        },
        setError(state:IAuthStates,action) {
            state.error = action.payload;
        },
        setLoading(state:IAuthStates, action) {
            state.loading = action.payload;
        },
        loggingHandler(state:IAuthStates, action) {
          state.token = action.payload;
          state.isLoggedIn = true;
          localStorage.setItem('token', action.payload);
        },
        logoutHandler(state:IAuthStates) {
          state.token = null;
          state.isLoggedIn = false;
          localStorage.removeItem('token');
          localStorage.removeItem('expirationTime');
          if(logoutTimer) {
            clearTimeout(logoutTimer);
          }
        }
    }
})

// Custom action creator
export const signInAndSignUp = (enteredEmail:string | undefined , enteredPassword:string | undefined, isLogin:boolean, navigate: NavigateFunction) => {
    return (dispatch : Dispatch) => {
        dispatch(AuthSlice.actions.setLoading(true));
        let url : string;
        if(isLogin){
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        } else {
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        }
        fetch(url,{
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
            dispatch(AuthSlice.actions.setLoading(false));
          if(res.ok) {
            return res.json();
          } else {
            res.json().then(data => {
              let errorMessage = 'Authentication failed!';
              if(data && data.error && data.error.message){
                errorMessage = data.error.message;
              }
              dispatch(AuthSlice.actions.setError(errorMessage));
            })
          }
        }).then(data => {
          if (data && data.idToken) {
            dispatch(AuthSlice.actions.loggingHandler(data.idToken));
            localStorage.setItem('expirationTime', data.expiresIn);
            const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
            const remainingTime = calculateRemainingTime(expirationTime);
            logoutTimer = setTimeout(() => dispatch(AuthSlice.actions.logoutHandler()), remainingTime);
            navigate('/',{replace : true});
          }
        }).catch(err => {
            dispatch(AuthSlice.actions.setError(err.message));
        })
    }
}

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;