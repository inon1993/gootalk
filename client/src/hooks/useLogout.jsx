import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { menuActions } from "../store/menu-slice";
import { accessTokenActions } from "../store/access-token-slice";
import { dropdownActions } from "../store/dropdown-slice";
import { settingsActions } from "../store/settings-slice";

const useLogout = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const theme = useSelector(state => state.settings.toggle.theme);

  const logout = async () => {
    try {
      await axios.put(`/settings/theme/${user.userId}`, {userId: user.userId, theme: theme}, {withCredentials: true});
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
    dispatch(settingsActions.themeReset());
  };

  return logout;
};

export default useLogout;
