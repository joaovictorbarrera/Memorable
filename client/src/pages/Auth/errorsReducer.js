export const ERRORS_INITIAL_STATE = {
    "email": {errorMessage: null}, 
    "username": {errorMessage: null}, 
    "password": {errorMessage: null}, 
    "confirm-password": {errorMessage: null}, 
    "first-name": {errorMessage: null}, 
    "last-name": {errorMessage: null}
}

export function errorsReducer(state, action) {
    switch(action.type) {
        case "CLEAR":
            return {...ERRORS_INITIAL_STATE}
        case "HANDLE_ERRORS":
            return {
                ...ERRORS_INITIAL_STATE,
                ...action.payload
            }
        default:
            return state
    }
}