import { GET, POST, DELETE, PUT } from '../constants/requestTypes';
import invokeApiCall from './apiHelper';

const BASE_URL = `https://dev-dl.tdcx.com:3092`
const API_KEY = `d60ea0faac69cf38`

export function getToken(name) {
  return invokeApiCall({
    endPoint: BASE_URL + '/login',
    apiParams: {
      name: name,
      apiKey: API_KEY
    },
    requestType: POST,
    setAccessToken: true
  }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    if (success) {
      return { success, data: responseData };
    }
    return { success, errors, showInlineAlerts };
  });
}

export function getSummary() {
  return invokeApiCall({
    endPoint: BASE_URL + '/dashboard',
    apiParams: {},
    requestType: GET,
    setAccessToken: true
  }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    if (success) {
      return { success, data: responseData };
    }
    return { success, errors, showInlineAlerts };
  });
}

export function addTask(data) {
  return invokeApiCall({
    endPoint: BASE_URL + '/tasks',
    apiParams: data,
    requestType: POST,
    setAccessToken: true
  }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    if (success) {
      return { success, data: responseData };
    }
    return { success, errors, showInlineAlerts };
  });
}


export function geAllTask() {
  return invokeApiCall({
    endPoint: BASE_URL + '/tasks',
    apiParams: {},
    requestType: GET,
    setAccessToken: true
  }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    if (success) {
      return { success, data: responseData };
    }
    return { success, errors, showInlineAlerts };
  });
}

export function editTask(data) {
  return invokeApiCall({
    endPoint: BASE_URL + '/tasks/' + data.id,
    apiParams: data,
    requestType: PUT,
    setAccessToken: true
  }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    if (success) {
      return { success, data: responseData };
    }
    return { success, errors, showInlineAlerts };
  });
}

export function deleteTask(id) {
  return invokeApiCall({
    endPoint: BASE_URL + '/tasks/' + id,
    apiParams: {},
    requestType: DELETE,
    setAccessToken: true
  }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    if (success) {
      return { success, data: responseData };
    }
    return { success, errors, showInlineAlerts };
  });
}
