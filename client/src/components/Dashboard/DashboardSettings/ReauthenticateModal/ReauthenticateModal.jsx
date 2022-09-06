import { useState, useRef } from "react";
import Modal from "../../../UI/Modal/Modal";
import axios from "axios";
import classes from "./ReauthenticateModal.module.css";

const ReauthenticateModal = ({requiredSettings, onClose}) => {
  const titleRef = useRef();

//   const saveEditHandler =() => {
//     console.log(props.id);
//     const payload = {
//       title: titleRef.current.value,
//       body: bodyRef.current.value,
//       id: props.id
//     }

//     axios({
//       method: 'patch',
//       url: '/api/edit',
//       data: payload
//   })
//   .then(() => {
//     console.log("Data has been updated.");
//     props.onClose();
//     props.onRefresh();
//   })
//   .catch(() => {
//     console.log("update error.");
//   });;
// }

  const closeReminderHandler = () => {
    onClose();
  };

  return (
    <Modal onClose={closeReminderHandler}>
      <div className={classes['modal-reauthenticate-wrapper']}>
        <span className={classes["modal-title"]}>Please enter your password:</span>
        <input className={classes['modal-input']} type="password" ref={titleRef} />
      </div>  
      <div className={classes.actions}>
        <button className={classes.continue} /*onClick={saveEditHandler}*/>Continue</button>
        <button className={classes.cancel} onClick={closeReminderHandler}>Cancel</button>
      </div>
    </Modal>
  );
};

export default ReauthenticateModal;