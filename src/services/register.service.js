import axios from "axios";
import { baseUrl } from "../environment.dev"; // make sure this points to your environment file

/**
 * Makes a POST request to register a new user.
 * @param {Object} registerModel - The registration data.
 * @returns {Promise} Axios Promise with the server response.
 */
export function registerAPICall(registerModel) {
    const url = `${baseUrl}api/Auth/register`; // Adjust endpoint if needed
    console.log("Register API URL:", url);
    return axios.post(url, registerModel);
}
