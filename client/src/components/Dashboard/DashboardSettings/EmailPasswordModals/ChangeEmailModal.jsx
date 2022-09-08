import Modal from "../../../UI/Modal/Modal";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../../store/user-slice";
import classes from "./ChangeEmailModal.module.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ChangeEmailModal = ({ onClose }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [errMsg, setErrMsg] = useState({ code: null, msg: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const req = useAxiosPrivate();

  const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const updateHandler = async (e) => {
    e.preventDefault();
    if (emailValidator.test(enteredEmail)) {
      try {
        await req.put(`/user/${user.userId}`, {
          ...user,
          email: enteredEmail,
          currentEmail: user.email,
        });
        setErrMsg({ code: null, msg: "" });
        setSuccessMsg("E-Mail adress updated successfully.");
        dispatch(
          userActions.setUser({
            ...user,
            email: enteredEmail,
          })
        );
        setTimeout(() => {
          setSuccessMsg("");
        }, 2500);
      } catch (error) {
        console.log(error);
        if (error.response.status === 403) {
          setSuccessMsg("");
          setErrMsg({ code: 403, msg: "E-Mail adress is the same as before." });
        }
        if (error.response.status === 409) {
          setSuccessMsg("");
          setErrMsg({ code: 409, msg: "E-Mail adress is already in use." });
        }
      }
    } else {
      setSuccessMsg("");
      setErrMsg({ code: null, msg: "Please enter a valid E-Mail adress." });
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <form onSubmit={updateHandler}>
        <div className={classes["change-email-wrapper"]}>
          <span className={classes["modal-title"]}>Enter new E-Mail:</span>
          <input
            className={classes["modal-input"]}
            type="email"
            onChange={(e) => {
              setEnteredEmail(e.target.value);
            }}
            required
            autoComplete="new-password"
          />
        </div>
        {errMsg.msg !== "" && (
          <div>
            <span>{errMsg.msg}</span>
          </div>
        )}
        {successMsg !== "" && (
          <div>
            <span>{successMsg}</span>
          </div>
        )}
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

export default ChangeEmailModal;
