export interface IAuthStates {
    token : string | null | undefined,
    isLoggedIn : boolean,
    isLogin : boolean,
    error : string | null,
    loading : boolean
}