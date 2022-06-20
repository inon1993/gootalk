import axios from "axios";

export const axiosPrivate = axios.create({
    headers: { 'Content-Type': 'aplication/json'},
    withCredentials: true
});