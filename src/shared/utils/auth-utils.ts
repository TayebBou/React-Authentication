

export const calculateRemainingTime = (expirationTime: Date) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjExpirationTime - currentTime;

    return remainingTime;
}

export const RetrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    if(storedExpirationDate){
        const remainingTime = calculateRemainingTime(new Date(storedExpirationDate));
        if(remainingTime <= 60000) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return null;
        }        
        return {
            token: storedToken,
            duration: remainingTime
        }
    }
    return null;
};