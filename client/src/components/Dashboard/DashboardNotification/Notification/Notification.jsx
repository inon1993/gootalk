import { useEffect, useState } from "react"
import Card from "../../../UI/Card/Card"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate"
import { userActions } from "../../../../store/user-slice"
import { useLocation } from "react-router-dom"
import classes from "./Notification.module.css"

const Notification = ({notification}) => {
    const [user, setUser] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const req = useAxiosPrivate();
    const location = useLocation();

    useEffect(() => {
        const getNotificationUser = async () => {
          try {
            const res = await req.get(`user/${notification.senderUserId}`);
            setUser(res.data);
          } catch (error) {
            dispatch(userActions.logoutUser());
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
        getNotificationUser();
      }, []);

    return (
        <Card >
            <span>{`${user.firstname} wants to be your friend.`}</span>
        </Card>
    )
}

export default Notification;