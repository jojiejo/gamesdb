const initialState = {
    email: '',
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGIN_PENDING':
        return {
            ...state,
            isLoginPending: action.payload.isLoginPending
        };
        
        case 'SET_LOGIN_SUCCESS':
        return {
            ...state,
            isLoginSuccess: action.payload.isLoginSuccess
        };
        
        case 'SET_LOGIN_ERROR':
        return {
            ...state,
            loginError: action.payload.loginError
        };
        
        case 'SET_EMAIL_ACTIVE':
        return {
            ...state,
            email : action.payload.email
        };
        
        case 'REMOVE_EMAIL_ACTIVE':
        return {
            ...state,
            email : action.payload.email,
            isLogoutSuccess: action.payload.isLogoutSuccess
        };
        
        default: return state;
    }
};
