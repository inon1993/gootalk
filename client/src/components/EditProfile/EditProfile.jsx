import { useSelector } from "react-redux";
import classes from "./EditProfile.module.css";
import ppIcon from "../../images/pp-icon-biggest.png"

const EditProfile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
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
    </div>
  );
};

export default EditProfile;
