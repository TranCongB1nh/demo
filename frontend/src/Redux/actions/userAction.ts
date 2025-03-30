import {
    LOGIN,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_FAILURE,
  } from "../userActionTypes"
  import axios from "axios"
  import {
    saveToken,
    saveUserData,
    removeUserData,
    removeToken,
  } from "../../utils/auth"
  
  export const userLogin = (email, password) => async (dispatch) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/user/sign-in', {
        email,
        password,
      });
  
      const { username, token } = response.data;
  
      saveToken(token);
      saveUserData({ email, username, token });
  
      dispatch({ type: LOGIN, payload: { username, email } });
      return Promise.resolve(response.data.user);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Email or password is incorrect.";
      dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
      return Promise.reject(error);
    }
  };
  

  export const userRegister = (username, email, password) => async (dispatch) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/user/sign-up", {
        username,
        email,
        password,
      });
  
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data.message });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error.response?.data?.message || "Registration failed",
      })
    }
  }
  
  export const userLogout = () => async (dispatch) => {
    removeToken()
    removeUserData()
  
    dispatch({ type: LOGOUT })
  }
  
  export const resetRegistrationMessage = () => ({
    type: "RESET_REGISTRATION_MESSAGE",
  })
  