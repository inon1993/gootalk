import classes from "./DashboardSettings.module.css"
import Card from "../../UI/Card/Card"

const DashboardSettings = () => {
    return (
        <Card className={classes["settings-wrapper"]}>
            <div className={classes["user-settings"]}>
                <span className={classes["settings-title"]}>User Settings</span>
                <button className={classes["settings-btn"]}>Change e-mail</button>
                <button className={classes["settings-btn"]}>Change password</button>
            </div>
        </Card>
    )
}

export default DashboardSettings