import { People } from "@mui/icons-material";
import classes from "./ProfileData.module.css";

const ProfileData = () => {
    return (
        <div className={classes["profile-data"]}>
            <div className={classes["profile-images"]}>
                <img className={classes["profile-cover"]} src="https://img.wallpapersafari.com/desktop/800/450/20/1/MPCYk3.jpg" alt="cover" />
                <div className={classes["profile-img-text"]}>
                    <img className={classes["profile-pic"]} src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg" alt="cover" />
                    <div>
                        <h3 className={classes["profile-name"]}>Inon Avramashvili</h3>
                        <span>Lod, Israel</span>
                    </div>
                </div>
            </div>
            <div className={classes["profile-info"]}>
                <div className={classes["profile-info-friends"]}>
                    <People className={classes["pi-icon"]} />
                    <span className={classes["pi-text"]}>You have 500 friends</span>
                </div>
                <div className={classes["profile-info-posts"]}>
                    <People className={classes["pi-icon"]} />
                    <span className={classes["pi-text"]}>You have 500 friends</span>
                </div>
                <div className={classes["profile-info-friends"]}>
                    <People className={classes["pi-icon"]} />
                    <span className={classes["pi-text"]}>You have 500 friends</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileData;