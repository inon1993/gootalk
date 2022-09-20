import classes from "./DashboardSettings.module.css";
import Card from "../../UI/Card/Card";
import { useState } from "react";
import ReauthenticateModal from "./ReauthenticateModal/ReauthenticateModal";
import ChangeEmailModal from "./AccountSettingsModals/ChangeEmailModal";
import ChangePasswordModal from "./AccountSettingsModals/ChangePasswordModal";
import DeleteAccountModal from "./AccountSettingsModals/DeleteAccountModal";
import { Switch } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { settingsActions } from "../../../store/settings-slice";
import axios from "axios";

const DashboardSettings = () => {
  const [reauthenticate, setReauthenticate] = useState(null);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const user = useSelector(state => state.user.user)
  const theme = useSelector((state) => state.settings.toggle.theme);
  const dispatch = useDispatch();

  const changeEmailHandler = () => {
    setReauthenticate("email");
  };

  const changePasswordHandler = () => {
    setReauthenticate("password");
  };

  const deleteAccountHandler = () => {
    setReauthenticate("delete-account");
  };

  const closeReauthenticate = () => {
    setReauthenticate(null);
  };

  const closeEmailModal = () => {
    setChangeEmail(false);
  };

  const closePasswordModal = () => {
    setChangePassword(false);
  };

  const closeDeleteAccountModal = () => {
    setDeleteAccount(false);
  };

  const toggleHandler = async () => {
    dispatch(settingsActions.themeToggle());
    await axios.put(
      `/settings/theme/${user.userId}`,
      { userId: user.userId, theme: theme === "light" ? "dark" : "light" },
      { withCredentials: true }
    );
  };

  return (
    <>
      {reauthenticate && (
        <ReauthenticateModal
          requiredSettings={reauthenticate}
          onClose={closeReauthenticate}
          onOpenEmailModal={setChangeEmail}
          onOpenPasswordModal={setChangePassword}
          onOpenDeleteAccountModal={setDeleteAccount}
        />
      )}
      {changeEmail && <ChangeEmailModal onClose={closeEmailModal} />}
      {changePassword && <ChangePasswordModal onClose={closePasswordModal} />}
      {deleteAccount && (
        <DeleteAccountModal onClose={closeDeleteAccountModal} />
      )}
      <Card className={classes["settings-wrapper"]}>
        <div className={classes["section-settings"]}>
          <span className={classes["settings-title"]}>Account</span>
          <button
            className={classes["settings-btn"]}
            onClick={changeEmailHandler}
          >
            Change E-Mail
          </button>
          <button
            className={classes["settings-btn"]}
            onClick={changePasswordHandler}
          >
            Change password
          </button>
          <button
            className={`${classes["settings-btn"]} ${classes["settings-btn-delete"]}`}
            onClick={deleteAccountHandler}
          >
            Delete account
          </button>
        </div>
        <div className={classes["section-settings"]}>
          <span className={classes["settings-title"]}>Appearence</span>
          <div className={classes["settings-toggle"]}>
            <span>Dark mode</span>
            <Switch
              onChange={toggleHandler}
              checked={theme === "dark" ? true : false}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default DashboardSettings;
