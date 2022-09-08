import Modal from "../../../UI/Modal/Modal";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./ChangeEmailModal.module.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ChangeEmailModal = ({ onClose }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [errMsg, setErrMsg] = useState({ code: null, msg: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const user = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();

  const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const updateHandler = async (e) => {
    e.preventDefault();
    if (emailValidator.test(enteredEmail)) {
      try {
        const res = await req.put(`/user/${user.userId}`, {
          ...user,
          email: enteredEmail,
          currentEmail: user.email,
        });
        setErrMsg({ code: null, msg: "" });
        setSuccessMsg("E-Mail adress updated successfully.");
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
      <div>
        <form onSubmit={updateHandler}>
          <span>Enter new E-Mail:</span>
          <input
            type="email"
            onChange={(e) => {
              setEnteredEmail(e.target.value);
            }}
            required
          />
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
          <div>
            <button>Update</button>
            <button type="button" onClick={() => onClose()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangeEmailModal;
