import classes from "./RightMenuFriends.module.css";
import RightMenuFriend from "./RightMenuFriend/RightMenuFriend";

const RightMenuFriends = () => {
    return (
        <div className={classes["right-menu-friends"]}>
            <RightMenuFriend />
            <RightMenuFriend />
            <RightMenuFriend />
            <RightMenuFriend />
            <RightMenuFriend />
            <RightMenuFriend />
        </div>
    )
}

export default RightMenuFriends;