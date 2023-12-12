// taskActions.ts

import {
  ADD_TASK_REQUEST,
  EDIT_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  GET_TASK_REQUEST,
  GET_USER_REQUEST
} from "./actionTypes";

export const getTasks = () => ({
  type: GET_TASK_REQUEST,
});

export const addTask = () => ({
  type: ADD_TASK_REQUEST,
});

export const addTaskSuccess = (user: any) => ({
  type: ADD_TASK_SUCCESS,
  payload: user,
});

export const getUserProfileRequest = (data: any) => ({
  type: GET_USER_REQUEST,
  payload: data,
});

export const addTaskFailure = (error: any) => ({
  type: ADD_TASK_FAILURE,
  payload: error,
});

export const editTask = () => ({
  type: EDIT_TASK_REQUEST,
});

export const editTaskSuccess = (user: any) => ({
  type: EDIT_TASK_SUCCESS,
  payload: user,
});

export const editTaskFailure = (error: any) => ({
  type: EDIT_TASK_FAILURE,
  payload: error,
});

export const deleteTask = () => ({
  type: DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (user: any) => ({
  type: DELETE_TASK_SUCCESS,
  payload: user,
});

export const deleteTaskFailure = (error: any) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});
