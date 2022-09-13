import classes from "./DeleteAccountModal.module.css";
import Modal from "../../../UI/Modal/Modal";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../../../../hooks/useLogout";

const DeleteAccountModal = ({onClose}) => {
    const req = useAxiosPrivate();
    const user = useSelector(state => state.user.user);
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
                data: {userId: user.userId,}
              });
              setSuccessMsg("Account was deleted successfully.");
              await logout();
            navigate("/login", { state: { from: location }, replace: true });
            setDisabled(false);
        } catch (error) {
            setSuccessMsg("");
            setErrMsg("Something went wrong. Try again.")
            setTimeout(() => {
                setErrMsg("");
            }, 2500)
            setDisabled(false);
        }
    }
    return (
        <Modal onClose={() => onClose()}>
            <form onSubmit={deleteAccountHandler}>
               <div>
                <span>You are about to delete your account.</span>
                <span>This action cannot be undone. Are you sure you want to continue?</span>
            </div>
            {errMsg !== "" && <span>{errMsg}</span>}
            {successMsg !== "" && <span>{successMsg}</span>}
            <div>
                <button disabled={disabled}>Delete</button>
                <button disabled={disabled} type="button">Cancel</button>
            </div> 
            </form>
            
        </Modal>
    )
}

export default DeleteAccountModal;