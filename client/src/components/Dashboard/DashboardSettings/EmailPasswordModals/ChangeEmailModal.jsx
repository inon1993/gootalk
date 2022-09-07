import Modal from "../../../UI/Modal/Modal";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./ChangeEmailModal.module.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ChangeEmailModal = ({ onClose }) => {
  const [enteredEmail, setEnteredEmail] = useState("");

  const updateHandler = (e) => {
    e.preventDefault();
    console.log(enteredEmail);
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
          <div>
            <button>Update</button>
            <button type="button" onClick={() => onClose()}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangeEmailModal;
