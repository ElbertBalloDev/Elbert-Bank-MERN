import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING, 
  CLEAR_ERRORS
} from "./types"; //Constants


export const registerUser = (userData, history) => dispatch => {  // Register User
  axios.post("/api/users/register", userData)
       .then(res => {
        dispatch({ type:CLEAR_ERRORS });
        history.push("/login");         // re-direct to login on successful register
      }) 
       .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loginUser = userData => dispatch => { // Login - get user token
  axios.post("/api/users/login", userData)
       .then(res => {
      const { token } = res.data;               // Save to localStorage  
      localStorage.setItem("jwtToken", token);  // Set token to localStorage
      setAuthToken(token);                      // Set token to Auth header
      const decoded = jwt_decode(token);        // Decode token to get user data
      dispatch(setCurrentUser(decoded));        // Set current user
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {      // Set logged in user
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setUserLoading = () => {           // User loading
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {   // Log user out
  localStorage.removeItem("jwtToken");          // Remove token from local storage
  setAuthToken(false);                          // Remove auth header for future requests
  dispatch(setCurrentUser({}));                 // Set current user to empty object {} which will set isAuthenticated to false
};