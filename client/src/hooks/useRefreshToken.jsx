import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { accessTokenActions } from "../store/access-token-slice";

const useRefreshToken = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("api/refresh", {
      withCredentials: true,
    });
    // dispatch(
    //   userActions.setUser({
    //     userId: user.userId,
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //     email: user.email,
    //     profilePicture: user.profilePicture,
    //     coverPicture: user.coverPicture,
    //     followers: user.followers,
    //     following: user.following,
    //     country: user.country,
    //     city: user.city,
    //   })
    // );
    dispatch(accessTokenActions.setAccessToken(response.data.accessToken));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
