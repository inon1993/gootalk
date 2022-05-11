import classes from "./Menu.module.css"
import {HomeRounded, PeopleRounded, PersonRounded, Settings} from '@mui/icons-material';

const Menu = () => {
    return (
        <div className={classes["menu-wrapper"]}>
            <ul className={classes["menu-list"]}>
                <li className={classes["menu-item"]}>
                    <HomeRounded className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>Home</span>
                </li>
                <li className={classes["menu-item"]}>
                    <PersonRounded className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>My Profile</span>
                </li>
                <li className={classes["menu-item"]}>
                    <PeopleRounded className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>My Friends</span>
                </li>
                <li className={classes["menu-item"]}>
                    <Settings className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>Settings</span>
                </li>
            </ul>
        </div>
    )
}

export default Menu