import { useState, useRef, useEffect } from "react";
import Modal from "../../../UI/Modal/Modal";
import axios from "axios";
import classes from "./ReauthenticateModal.module.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const ReauthenticateModal = ({
  requiredSettings,
  onClose,
  onOpenEmailModal,
  onOpenPasswordModal,
  onOpenDeleteAccountModal
}) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const user = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();
  const passwordRef = useRef();

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const continueHandler = async (e) => {
    e.preventDefault();
    try {
      await req.post(`/auth/reauth/${user.userId}`, {
        password: enteredPassword,
      });
      if (requiredSettings === "email") {
        onClose();
        onOpenEmailModal(true);
      }
      if (requiredSettings === "password") {
        onClose();
        onOpenPasswordModal(true);
      }
      if (requiredSettings === "delete-account") {
        onClose();
        onOpenDeleteAccountModal(true);
      }
    } catch (error) {
      setErrMsg("Invalid password.");
    }
  };

  const closeReminderHandler = () => {
    onClose();
  };

  return (
    <Modal onClose={closeReminderHandler}>
      <form onSubmit={continueHandler}>
        <div className={classes["modal-reauthenticate-wrapper"]}>
          <span className={classes["modal-title"]}>
            Please enter your password:
          </span>
          <input
            className={classes["modal-input"]}
            type="password"
            onChange={(e) => {
              setErrMsg("");
              setEnteredPassword(e.target.value);
            }}
            ref={passwordRef}
            required
          />
          {errMsg !== "" && (
            <span className={classes["err-msg"]}>{errMsg}</span>
          )}
        </div>
        <div className={classes.actions}>
          <button className={classes.continue}>Continue</button>
          <button
            className={classes.cancel}
            type="button"
            onClick={closeReminderHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReauthenticateModal;
