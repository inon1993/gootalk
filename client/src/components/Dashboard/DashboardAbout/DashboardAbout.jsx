import classes from "./DashboardAbout.module.css";
import Card from "../../UI/Card/Card";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const DashboardAbout = () => {
  const [reauthenticate, setReauthenticate] = useState(null);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.settings.toggle.theme);
  const dispatch = useDispatch();

  return (
    <>
      <Card className={classes["about-wrapper"]}>
        <h1 className={classes["about-title-goo"]}>
          Goo<span className={classes["about-title-talk"]}>talk</span>
        </h1>
        <h3 className={classes["about-sub-title"]}>
          A social network app, built with React.js, Node.js, Express.js and
          MongoDB.
        </h3>

        <div className={classes["section-about"]}>
          <span className={classes["about-title"]}>Introduction</span>
          <p>
            Welcome to Gootalk, my social network app.
            <br />
            This project was built as a side project, with the goal to sharpen
            my M.E.R.N. stack coding skills in mind.
            <br />
            I'm updating this app from time to time, adding features and fixing
            bugs
          </p>
        </div>
        <div className={classes["section-about"]}>
          <span className={classes["about-title"]}>Key features</span>
          <ul>
            <li>Register with your own user to get connected with friends.</li>
            <li>Share your thoughts with your friends.</li>
            <li>Like and comment on posts.</li>
            <li>Share images and videos with your friends.</li>
            <li>Enjoy a beautiful and responsive UI.</li>
          </ul>
        </div>
        <div className={classes["section-about"]}>
          <span className={classes["about-title"]}>Get Started</span>
          <p>
            Register with a new profile, or login to an existing profile (all of
            your data will be editable later on profile page/settings page).
            Look for your friends on the search bar and ask for friendship. When
            they will accept your friendship request, you'll be able to comment
            on their posts. Now you can share your thoughts, images and videos
            will the people you want!
          </p>
        </div>
        <div className={classes["section-about"]}>
          <span className={classes["about-title"]}>Tips and tricks</span>
          <ul>
            <li>
              To edit your profile, just go to your profile page (from the
              navigation bar menu, or from the left main menu) and click on the
              edit button in the top right corner.
            </li>
            <li>Add a cover picture from the edit profile page.</li>
            <li>
              Toggle between Light Mode and Dark Mode easily from the top
              navigation bar or from the settings page.
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default DashboardAbout;
