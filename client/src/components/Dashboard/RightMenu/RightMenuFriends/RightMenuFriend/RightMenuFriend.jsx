import classes from "./RightMenuFriend.module.css"
import { AccountCircleRounded } from "@mui/icons-material"

const RightMenuFriend = () => {
    return (
        <div className={classes["rm-friend"]}>
            <AccountCircleRounded className={classes["rm-friend-img"]} />
            <span className={classes["rm-friend-text"]}>Racheli Avramashvili</span>
        </div>
    )
}

export default RightMenuFriend;