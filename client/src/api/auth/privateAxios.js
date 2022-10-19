import axios from "axios";

export const axiosPrivate = axios.create({
    withCredentials: true
});