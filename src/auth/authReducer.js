import { types } from "../types/types";


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            console.log("here", action)
            return {
                ...action.payload,
                logged: true
            }

        case types.logout:
            return {
                logged: false
            }
    
        default:
            return state;
    }
}