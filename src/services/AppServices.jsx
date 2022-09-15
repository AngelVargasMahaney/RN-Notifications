
import axios from 'axios'
import { URL_BACKEND, URL_BACKEND2 } from '../environments/environments';


export const getAllUsers = async () => {
    const rpta = await axios.get(`${URL_BACKEND}/users`);
    return rpta
}



export const postLogin = async (email, password) => {

    const rpta = await axios.post(
        `${URL_BACKEND2}/login?system_type=3`,
        {},
        {
            auth: {
                username: email,
                password: password,
            }
        }
    );

    return rpta
}

export const getAllRiskAsociate = async () => {
    const rpta = await axios.get(`${URL_BACKEND2}/app/risk`, {
    });
    return rpta
}