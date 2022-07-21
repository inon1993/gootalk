import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { menuActions } from "../store/menu-slice";
import { accessTokenActions } from "../store/access-token-slice";
import { dropdownActions } from "../store/dropdown-slice";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
    } catch (e) {
      return e;
    }

    localStorage.removeItem("persist:root");
    dispatch(userActions.logoutUser());
    dispatch(menuActions.deactivate());
    dispatch(dropdownActions.deactivate());
    dispatch(accessTokenActions.removeAccessToken());
  };

  return logout;
};

export default useLogout;
