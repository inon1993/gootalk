import classes from "./RightMenuFriends.module.css";
import RightMenuFriend from "./RightMenuFriend/RightMenuFriend";
import { useSelector } from "react-redux";

const RightMenuFriends = ({notification, friends}) => {
    const user = useSelector(state => state.user.user)
    console.log(notification);
    return (
        <div className={`${classes["right-menu-friends"]} ${!notification && classes["no-notification"]}`}>
            {friends.map((res, i) => {
                return <RightMenuFriend key={i} friend={res} />
            })}
        </div>
    )
}

export default RightMenuFriends;