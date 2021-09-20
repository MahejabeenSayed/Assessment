import HTTP from './HTTP';
import { GET } from '../constants/requestTypes';


export default function invokeApiCall({
    requestType = GET,
    endPoint = '',
    apiParams = {},
    shouldShowSuccessMessage = false,
    shouldShowErrorMessage = false,
    setAccessToken = true,
    options
}) {
    return HTTP[requestType](endPoint, apiParams, options)
        .then(response => {
            if (response.success) {
                return response;
            }
            return response;
        })
        .catch(() => {
            return { success: false };
        });
}
