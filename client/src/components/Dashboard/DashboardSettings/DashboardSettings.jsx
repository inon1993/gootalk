import classes from "./DashboardSettings.module.css";
import Card from "../../UI/Card/Card";
import { useState } from "react";
import ReauthenticateModal from "./ReauthenticateModal/ReauthenticateModal";
import ChangeEmailModal from "./AccountSettingsModals/ChangeEmailModal";
import ChangePasswordModal from "./AccountSettingsModals/ChangePasswordModal";
import DeleteAccountModal from "./AccountSettingsModals/DeleteAccountModal";

const DashboardSettings = () => {
  const [reauthenticate, setReauthenticate] = useState(null);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  
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
    setDeleteAccount(false)
  }

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
      {deleteAccount && <DeleteAccountModal onClose={closeDeleteAccountModal} />}
      <Card className={classes["settings-wrapper"]}>
        <div className={classes["user-settings"]}>
          <span className={classes["settings-title"]}>Account Settings</span>
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
            className={classes["settings-btn"]}
            onClick={deleteAccountHandler}
          >
            Delete account
          </button>
        </div>
      </Card>
    </>
  );
};

export default DashboardSettings;
