import classes from "./DeleteAccountModal.module.css";
import Modal from "../../../UI/Modal/Modal";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../../../../hooks/useLogout";
import { CircularProgress } from "@mui/material";

const DeleteAccountModal = ({ onClose }) => {
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const [disabled, setDisabled] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const deleteAccountHandler = async (e) => {
    setDisabled(true);
    e.preventDefault();
    try {
      await req.delete(`/user/${user.userId}`, {
        data: { userId: user.userId },
      });
      setSuccessMsg("Account was deleted successfully.");
      setTimeout(async () => {
        if (navigator.onLine) {
          await logout();
          navigate("/login", { state: { from: location }, replace: true });
          setDisabled(false);
        }
      }, 2000);
    } catch (error) {
      setSuccessMsg("");
      setErrMsg("Something went wrong. Try again.");
      setTimeout(() => {
        setErrMsg("");
      }, 2500);
      setDisabled(false);
    }
  };
  return (
    <Modal onClose={() => onClose()}>
      <form onSubmit={deleteAccountHandler}>
        <div className={classes["delete-account-wrapper"]}>
          <span className={classes["modal-title-main"]}>
            You are about to delete your account.
          </span>
          <span className={classes["modal-title"]}>
            This action cannot be undone. Are you sure you want to continue?
          </span>
          {errMsg !== "" && (
            <span className={classes["err-msg"]}>{errMsg}</span>
          )}
          {successMsg !== "" && (
            <span className={classes["success-update-msg"]}>{successMsg}</span>
          )}
        </div>
        <div className={classes.actions}>
          <button className={classes.delete} disabled={disabled}>
            {disabled ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Delete"
            )}
          </button>
          <button
            className={classes.cancel}
            disabled={disabled}
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

export default DeleteAccountModal;
