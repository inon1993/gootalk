import classes from "./Menu.module.css"
import {HomeRounded, PeopleRounded, PersonRounded, Settings} from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../../../store/menu-slice";
import { navbarActions } from "../../../store/navbar-slice";

const Menu = () => {

    const isActivated = useSelector(state => state.menu.activate);
    const dispatch = useDispatch();
    
    const activateHome = () => {
        dispatch(menuActions.activateHome());
        dispatch(navbarActions.deactivate());
    }

    const activateProfile = () => {
        dispatch(menuActions.activateProfile());
        dispatch(navbarActions.deactivate());
    }

    const activateFriends = () => {
        dispatch(menuActions.activateFriends());
        dispatch(navbarActions.deactivate());
    }

    const activateSettings = () => {
        dispatch(menuActions.activateSettings());
        dispatch(navbarActions.deactivate());
    }

    return (
        <div className={classes["menu-wrapper"]}>
            <ul className={classes["menu-list"]}>
                <li className={isActivated.home ? classes["menu-item-active"] : classes["menu-item"]} onClick={activateHome}>
                    <HomeRounded className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>Home</span>
                </li>
                <li className={isActivated.profile ? classes["menu-item-active"] : classes["menu-item"]} onClick={activateProfile}>
                    <PersonRounded className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>My Profile</span>
                </li>
                <li className={isActivated.friends ? classes["menu-item-active"] : classes["menu-item"]} onClick={activateFriends}>
                    <PeopleRounded className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>My Friends</span>
                </li>
                <li className={isActivated.settings ? classes["menu-item-active"] : classes["menu-item"]} onClick={activateSettings}>
                    <Settings className={classes["menu-list-icon"]} />
                    <span className={classes["menu-text"]}>Settings</span>
                </li>
            </ul>
        </div>
    )
}

export default Menu