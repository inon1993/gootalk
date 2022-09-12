import classes from "./DashboardSettings.module.css";
import Card from "../../UI/Card/Card";
import { useState } from "react";
import ReauthenticateModal from "./ReauthenticateModal/ReauthenticateModal";
import ChangeEmailModal from "./EmailPasswordModals/ChangeEmailModal";
import ChangePasswordModal from "./EmailPasswordModals/ChangePasswordModal";

const DashboardSettings = () => {
  const [reauthenticate, setReauthenticate] = useState(null);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const changeEmailHandler = () => {
    setReauthenticate("email");
  };

  const changePasswordHandler = () => {
    setReauthenticate("password");
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

  return (
    <>
      {reauthenticate && (
        <ReauthenticateModal
          requiredSettings={reauthenticate}
          onClose={closeReauthenticate}
          onOpenEmailModal={setChangeEmail}
          onOpenPasswordModal={setChangePassword}
        />
      )}
      {changeEmail && <ChangeEmailModal onClose={closeEmailModal} />}
      {changePassword && <ChangePasswordModal onClose={closePasswordModal} />}
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
        </div>
      </Card>
    </>
  );
};

export default DashboardSettings;
