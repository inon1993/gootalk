import axios from 'axios';

export const signup = async (data) => {
    const user = await axios({url: "auth/register", method: "POST", data: data});
    return user;
}