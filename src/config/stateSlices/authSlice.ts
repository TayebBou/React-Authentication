import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { IAuthStates } from "../../shared/models/authStates.model";
import { RetrieveStoredToken } from "../../shared/utils/auth-utils";
import { BASE_URL } from "../constants";

let logoutTimer: NodeJS.Timeout;
const tokenData = RetrieveStoredToken();
if (tokenData) {
  logoutTimer = setTimeout(
    () => authActions.logoutHandler(),
    tokenData.duration
  );
}
const initialToken = tokenData?.token;
const initialAuthState: IAuthStates = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  isLogin: true,
  error: null,
  loading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    switchAuthMode(state: IAuthStates) {
      state.isLogin = !state.isLogin;
    },
    setError(state: IAuthStates, action) {
      state.error = action.payload;
    },
    setLoading(state: IAuthStates, action) {
      state.loading = action.payload;
    },
    loggingHandler(state: IAuthStates, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logoutHandler(state: IAuthStates) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    },
  },
});

// Custom signInAndSignUp thunk
export const signInAndSignUp = (
  enteredEmail: string | undefined,
  enteredPassword: string | undefined,
  isLogin: boolean,
  navigate: NavigateFunction
) => {
  return (dispatch: Dispatch) => {
    dispatch(AuthSlice.actions.setLoading(true));
    let url: string;
    // if user is in signIn or signUp mode
    if (isLogin) {
      url = `${BASE_URL}/login`;
    } else {
      url = `${BASE_URL}/signup`;
    }
    axios
      .post(
        url,
        {
          email: enteredEmail,
          password: enteredPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(AuthSlice.actions.setLoading(false));
        dispatch(AuthSlice.actions.loggingHandler(res.data.idToken));
        const expirationTime =
          new Date().getTime() + +res.data.expiresIn * 1000;
        localStorage.setItem("expirationTime", expirationTime.toString());
        logoutTimer = setTimeout(
          () => dispatch(AuthSlice.actions.logoutHandler()),
          +res.data.expiresIn * 1000
        );
        navigate("/", { replace: true });
      })
      .catch((err) => {
        dispatch(AuthSlice.actions.setLoading(false));
        let errorMessage = "Authentication failed!";
        if (err?.response) {
          if (err.response?.data?.error?.message) {
            errorMessage = err.response.data.error.message;
          }
        } else if (err?.request) {
          errorMessage = "Request error!";
        } else {
          if (err && err?.message) {
            errorMessage = err.message;
          }
        }
        dispatch(AuthSlice.actions.setError(errorMessage));
      });
    // using fetch function

    // fetch(url,{
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(res => {
    //     dispatch(AuthSlice.actions.setLoading(false));
    //   if(res.ok) {
    //     return res.json();
    //   } else {
    //     res.json().then(data => {
    //       let errorMessage = 'Authentication failed!';
    //       if(data && data.error && data.error.message){
    //         errorMessage = data.error.message;
    //       }
    //       dispatch(AuthSlice.actions.setError(errorMessage));
    //     })
    //   }
    // }).then(data => {
    //   if (data && data.idToken) {
    //    dispatch(AuthSlice.actions.loggingHandler(res.data.idToken));
    //    const expirationTime = new Date().getTime() + (+res.data.expiresIn * 1000);
    //    localStorage.setItem('expirationTime', expirationTime.toString());
    //    logoutTimer = setTimeout(() => dispatch(AuthSlice.actions.logoutHandler()), +res.data.expiresIn * 1000);
    //    navigate('/',{replace : true});
    //   }
    // }).catch(err => {
    //     dispatch(AuthSlice.actions.setError(err.message));
    // })
  };
};

// Custom changePassword thunk
export const changePassword = (
  token: string | null | undefined,
  enteredNewPassword: string | undefined,
  navigate: NavigateFunction
) => {
  return (dispatch: Dispatch) => {
    axios
      .post(
        `${BASE_URL}/updatePassword`,
        {
          newPassword: enteredNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        let errorMessage = "Changing password failed!";
        if (err?.response) {
          if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err?.request) {
          errorMessage = "Request error!";
        } else {
          if (err && err?.message) {
            errorMessage = err.message;
          }
        }
        dispatch(AuthSlice.actions.setError(errorMessage));
      });
  };

  // fetch methode

  // fetch(`${BASE_URL}/updatePassword`, {
  //     method : 'POST',
  //     body : JSON.stringify({
  //     token,
  //     newPassword: enteredNewPassword,
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
  //         dispatch(AuthSlice.actions.setError(errorMessage));
  //         })
  //     }
  // })
};

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
