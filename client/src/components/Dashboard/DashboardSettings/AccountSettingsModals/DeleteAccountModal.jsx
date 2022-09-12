import classes from "./DeleteAccountModal.module.css";
import Modal from "../../../UI/Modal/Modal";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const DeleteAccountModal = ({onClose}) => {
    const req = useAxiosPrivate();
    const user = useSelector(state => state.user.user);

    const deleteAccountHandler = async (e) => {
        e.preventDefault();
        try {
            // await req.delete(`/user/${user.userId}`, {userId: user.userId})
            await req.delete(`/user/${user.userId}`, {
                data: {userId: user.userId,}
              });
            console.log("yes");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal onClose={() => onClose()}>
            <form onSubmit={deleteAccountHandler}>
               <div>
                <span>You are about to delete your account.</span>
                <span>This action cannot be undone. Are you sure you want to continue?</span>
            </div>
            <div>
                <button>Delete</button>
                <button type="button">Cancel</button>
            </div> 
            </form>
            
        </Modal>
    )
}

export default DeleteAccountModal;