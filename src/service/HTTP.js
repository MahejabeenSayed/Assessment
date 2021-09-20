import { useHistory } from 'react-router';
import defaultAPIClient from './client';

function callApi(endpoint, method, body, { APIClient = defaultAPIClient } = {}) {
  const history = useHistory()
  APIClient.defaults.headers['Authorization'] = "Bearer " + sessionStorage.getItem('react-token');
  return APIClient[method](endpoint, body)
    .then(response => {
      return { success: true, data: response.data };
    })
    .catch(error => {
      if (error.response) {
        /*
          This code block will be executed if the request was made and the server
          responded with a status code that falls out of the range of 2xx (i.e. 3xx and 4xx etc.)
        */
        if (error.response.status === 401) {
          history.push('/sign-in')    
          return {
            success: false,
            errors: { data: { message: "Please, Login to authenticate your self." } }
          };
        }
        if (error.response.status === 400) {
          return { success: false, errors: error.response, showInlineAlerts: true };
        }

        return { success: false, errors: error.response };
      }
      if (error.request) {
        // The request was made but no response was received
        return {
          success: false,
          errors: { data: { message: "Unable to process your request. Please try again later."} }
        };
      }
      // // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        errors: error
      };
    });
}



export default {
  get: (url, body, options) => callApi(url, 'get', { params: body }, options),
  post: (url, body, options) => callApi(url, 'post', body, options),
  put: (url, body, options) => callApi(url, 'put', body, options),
  delete: (url, body, options) => callApi(url, 'delete', body, options)
};