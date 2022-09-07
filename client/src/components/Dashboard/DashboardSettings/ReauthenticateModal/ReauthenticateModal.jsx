import { useState, useRef, useEffect } from "react";
import Modal from "../../../UI/Modal/Modal";
import axios from "axios";
import classes from "./ReauthenticateModal.module.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const ReauthenticateModal = ({requiredSettings, onClose, onOpenEmailModal, onOpenPasswordModal}) => {
    const [enteredPassword, setEnteredPassword] = useState("");
  const user = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();
  const passwordRef = useRef();

  useEffect(() => {
    passwordRef.current.focus();
  }, [])

    const continueHandler = async (e) => {
        e.preventDefault();
        try {
            await req.post(`/auth/reauth/${user.userId}`, {password: enteredPassword})
            if(requiredSettings === "email") {
                onClose()
                onOpenEmailModal(true)
            }
            if(requiredSettings === "password") {
                onClose()
                onOpenPasswordModal(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
//   const titleRef = useRef();

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
        <form onSubmit={continueHandler}>
           <div className={classes['modal-reauthenticate-wrapper']}>
        <span className={classes["modal-title"]}>Please enter your password:</span>
        <input className={classes['modal-input']} type="password" onChange={(e) => {setEnteredPassword(e.target.value)}} ref={passwordRef} required/>
      </div>  
      <div className={classes.actions}>
        <button className={classes.continue}>Continue</button>
        <button className={classes.cancel} type="button" onClick={closeReminderHandler}>Cancel</button>
      </div> 
        </form>
      
    </Modal>
  );
};

export default ReauthenticateModal;