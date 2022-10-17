export interface ErrorReducerState {
    "email": {
        errorMessage: string | null
    },
    "username": {
        errorMessage: string | null
    },
    "password": {
        errorMessage: string | null
    },
    "confirm-password": {
        errorMessage: string | null
    },
    "firstName": {
        errorMessage: string | null
    },
    "lastName": {
        errorMessage: string | null
    }
}

export const ERRORS_INITIAL_STATE: ErrorReducerState = {
    "email": {errorMessage: null}, 
    "username": {errorMessage: null}, 
    "password": {errorMessage: null}, 
    "confirm-password": {errorMessage: null}, 
    "firstName": {errorMessage: null}, 
    "lastName": {errorMessage: null}
}

export function errorsReducer(state: ErrorReducerState, action: {type: string, payload?: ErrorReducerState}) {
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