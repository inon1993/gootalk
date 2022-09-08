import Modal from "../../../UI/Modal/Modal";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ChangePasswordModal.module.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ChangePasswordModal = ({ onClose }) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordAgain, setEnteredPasswordAgain] = useState("");
  const [errMsg, setErrMsg] = useState({ code: null, msg: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const user = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();

  const passwordRef = useRef();

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();
    if (
      enteredPassword.length > 5 &&
      enteredPassword === enteredPasswordAgain
    ) {
      try {
        await req.put(`/user/${user.userId}`, {
          ...user,
          password: enteredPassword,
          updateRequired: "password",
        });
        setErrMsg({ code: null, msg: "" });
        setSuccessMsg("Password updated successfully.");
        setTimeout(() => {
          setSuccessMsg("");
        }, 2500);
      } catch (error) {
        setErrMsg({ code: 500, msg: "Something went wrong. Try again." });
      }
    } else {
      setSuccessMsg("");
      setErrMsg({ code: null, msg: "Please enter a valid password." });
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <form onSubmit={updateHandler}>
        <div className={classes["change-password-wrapper"]}>
          <span className={classes["modal-title"]}>Enter new password:</span>
          <input
            className={classes["modal-input"]}
            type="password"
            onChange={(e) => {
              setErrMsg({ code: null, msg: "" });
              setEnteredPassword(e.target.value);
            }}
            required
            autoComplete="new-password"
            ref={passwordRef}
            style={{ margin: "0 0 10px 0" }}
          />
          <span className={classes["modal-title"]}>
            Enter new password again:
          </span>
          <input
            className={classes["modal-input"]}
            type="password"
            onChange={(e) => {
              setErrMsg({ code: null, msg: "" });
              setEnteredPasswordAgain(e.target.value);
            }}
            required
            autoComplete="new-password"
          />
          {errMsg.msg !== "" && (
            <span className={classes["err-msg"]}>{errMsg.msg}</span>
          )}
          {successMsg !== "" && (
            <span className={classes["success-update-msg"]}>{successMsg}</span>
          )}
        </div>
        <div className={classes.actions}>
          <button className={classes.update}>Update</button>
          <button
            className={classes.cancel}
            type="button"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
