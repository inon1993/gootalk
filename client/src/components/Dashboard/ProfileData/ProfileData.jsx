import { useState } from "react";
import classes from "./ProfileData.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { useSelector } from "react-redux";
import ppIcon from "../../../images/pp-icon-big.png";

const ProfileData = () => {
  const [isStats, setIsStats] = useState(true);
  const user = useSelector((state) => state.user.user);

  const statsHandler = () => {
    setIsStats(!isStats);
  };

  return (
    <div className={classes["profile-data"]}>
      <div className={classes["profile-images"]}>
        <img
          className={classes["profile-cover"]}
          src="https://img.wallpapersafari.com/desktop/800/450/20/1/MPCYk3.jpg"
          alt="cover"
        />
        <div className={classes["profile-img-text"]}>
          <img
            className={classes["profile-pic"]}
            src={user.profilePicture || ppIcon}
            alt="cover"
          />
          <div className={classes["profile-name-city"]}>
            <h3
              className={classes["profile-name"]}
            >{`${user.firstname} ${user.lastname}`}</h3>
            {user.country && user.city ? (
              <span
                className={classes["profile-city"]}
              >{`${user.city}, ${user.country}`}</span>
            ) : (
              (user.country || user.city) && (
                <span className={classes["profile-city"]}>{`${
                  user.city || user.country
                }`}</span>
              )
            )}
          </div>
        </div>
      </div>
      <div className={classes.stats}>
        <div className={classes["stats-buttons"]}>
          {!isStats && (
            <button
              className={classes["show-stats-button"]}
              onClick={statsHandler}
            >
              Show stats
            </button>
          )}
          {isStats && (
            <button
              className={classes["show-stats-button"]}
              onClick={statsHandler}
            >
              Hide stats
            </button>
          )}
        </div>

        {isStats && <ProfileInfo />}
      </div>
    </div>
  );
};

export default ProfileData;
