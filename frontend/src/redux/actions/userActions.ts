// userActions.ts

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT
} from "./actionTypes";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user: any) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error: any) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});