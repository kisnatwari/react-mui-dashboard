import { SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNUP_REQUEST } from "./Signup.state";

const signupRequest = () => {
    return {
        type: SIGNUP_REQUEST
    }
}

export {
    signupRequest
}