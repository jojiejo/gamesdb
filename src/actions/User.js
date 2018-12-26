import axios from "axios";

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_EMAIL_ACTIVE = 'SET_EMAIL_ACTIVE';
const REMOVE_EMAIL_ACTIVE = 'REMOVE_EMAIL_ACTIVE';

function setLoginPending(isLoginPending){
    return {
        type: SET_LOGIN_PENDING,
        payload: { 
            isLoginPending : isLoginPending
        }
    };
}

function setLoginSuccess(isLoginSuccess){
    return {
        type: SET_LOGIN_SUCCESS,
        payload: {
            isLoginSuccess: isLoginSuccess
        }
    };
}

function setLoginError(loginError){
    return {
        type: SET_LOGIN_ERROR,
        payload:{
            loginError: loginError
        }
    }
}

function setEmailActive(email){
    localStorage.setItem('email', email);
    
    return {
        type: SET_EMAIL_ACTIVE,
        payload:{
            email: email
        }
    }
}

const login = (email, password) => {
    return (dispatch) => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));
        
        const goAsync = async() => {
			await axios.get('https://us-central1-games-db-630c4.cloudfunctions.net/getUsers')
			.then((response) => {
				const data = response.data;
				const email_list = data.map(datum => datum.email);
                
                dispatch(setLoginPending(false));
                if(email_list.indexOf(email) > -1){
                    dispatch(setLoginSuccess(true));
                    dispatch(setLoginError(null));
                    
                    dispatch(setEmailActive(email));
                }
                else{
                    dispatch(setLoginSuccess(false));
                    dispatch(setLoginError('Wrong username / password. Try login using jojiejo@gmail.com with random password.'));
                }
			})
            .catch((error) => {
                dispatch(setLoginPending(false));
                dispatch(setLoginSuccess(false));
                dispatch(setLoginError(error));
            });
		}
		
		goAsync();
    }
}

const logout = () =>{
    localStorage.removeItem('email');
    
    return {
        type: REMOVE_EMAIL_ACTIVE,
        payload:{
            email: ''
        }
    }
}

const updateEmail = (email) => {
    return (dispatch) => {
        dispatch(setEmailActive(email));
    }
}

export {
    login,
    logout,
    updateEmail
}