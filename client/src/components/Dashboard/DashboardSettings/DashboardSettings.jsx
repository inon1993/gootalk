import classes from "./DashboardSettings.module.css";
import Card from "../../UI/Card/Card";
import { useState } from "react";
import ReauthenticateModal from "./ReauthenticateModal/ReauthenticateModal";

const DashboardSettings = () => {
  const [reauthenticate, setReauthenticate] = useState(null);
  const changeEmailHandler = () => {
    setReauthenticate("email");
  };

  const changePasswordHandler = () => {
    setReauthenticate("password");
  };

  const closeReauthenticate = () => {
    setReauthenticate(null);
  };

  return (
    <>
      {reauthenticate && (
        <ReauthenticateModal
          requiredSettings={reauthenticate}
          onClose={closeReauthenticate}
        />
      )}
      <Card className={classes["settings-wrapper"]}>
        <div className={classes["user-settings"]}>
          <span className={classes["settings-title"]}>User Settings</span>
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
