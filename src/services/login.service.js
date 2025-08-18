
import axios from "axios";
import {baseUrl} from '../environment.dev';

export function loginAPICall(loginModel)
{
    const url = baseUrl+'api/Auth/login';
    console.log(url)
    return axios.post(url,loginModel)
}