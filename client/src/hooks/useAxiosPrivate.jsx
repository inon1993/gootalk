import { axiosPrivate } from "../api/auth/privateAxios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import axios from "axios";
import useLogout from "./useLogout";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const logout = useLogout();
  const accessToken = useSelector((state) => state.accessToken.accessToken);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log(prevRequest);
        if(prevRequest.url === '/refresh') {
          console.log(8888);
          await logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }
        else if (error?.response?.status === 401 && prevRequest.url !== '/refresh' /*prevRequest?.sent !== true*/) {
          console.log(1);
          console.log(accessToken);
          // prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(2);
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
