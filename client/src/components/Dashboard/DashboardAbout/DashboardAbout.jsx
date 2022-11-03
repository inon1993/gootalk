import classes from "./DashboardAbout.module.css";
import Card from "../../UI/Card/Card";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";

const DashboardAbout = () => {
  const [selected, setSelected] = useState({
    keyFeatures: false,
    getStarted: false,
    tipsAndTricks: false,
  });

  const toggle = (i) => {
    if (i === 1) {
      if (selected.keyFeatures) {
        setSelected((prev) => ({
          ...prev,
          keyFeatures: false,
        }));
      } else {
        setSelected((prev) => ({
          ...prev,
          keyFeatures: true,
        }));
      }
    } else if (i === 2) {
      if (selected.getStarted) {
        setSelected((prev) => ({
          ...prev,
          getStarted: false,
        }));
      } else {
        setSelected((prev) => ({
          ...prev,
          getStarted: true,
        }));
      }
    } else if (i === 3) {
      if (selected.tipsAndTricks) {
        setSelected((prev) => ({
          ...prev,
          tipsAndTricks: false,
        }));
      } else {
        setSelected((prev) => ({
          ...prev,
          tipsAndTricks: true,
        }));
      }
    }
  };

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
            bugs.
          </p>
          <span className={classes["about-inon"]}>- Inon Avramashvili</span>
        </div>
        <div className={classes["section-about"]}>
          <div className={classes["section-upper"]} onClick={() => toggle(1)}>
            <span className={`${classes["about-title"]} ${
              selected.keyFeatures && classes["about-title-expended"]
            }`}>Key features</span>
            <KeyboardArrowDown
              style={{
                transform: selected.keyFeatures ? "rotate(180deg)" : "",
                transition: "transform 300ms ease",
              }}
            />
          </div>
          <ul
            className={`${classes["expended-section-off"]} ${
              selected.keyFeatures && classes["expended-section-on"]
            }`}
          >
            <li>Register with your own user to get connected with friends.</li>
            <li>Share your thoughts with your friends.</li>
            <li>Like and comment on posts.</li>
            <li>Share images and videos with your friends.</li>
            <li>Enjoy a beautiful and responsive UI.</li>
          </ul>
        </div>
        <div className={classes["section-about"]}>
          <div className={classes["section-upper"]} onClick={() => toggle(2)}>
            <span className={`${classes["about-title"]} ${
              selected.getStarted && classes["about-title-expended"]
            }`}>Get started</span>
            <KeyboardArrowDown
              style={{
                transform: selected.getStarted ? "rotate(180deg)" : "",
                transition: "transform 300ms ease",
              }}
            />
          </div>
          <p
            className={`${classes["expended-section-off"]} ${
              selected.getStarted && classes["expended-section-on"]
            }`}
          >
            Register with a new profile, or login to an existing profile (all of
            your data will be editable later on profile page/settings page).
            <br />
            Look for your friends on the search bar and ask for friendship.
            <br />
            When they will accept your friendship request, you'll be able to
            comment on their posts.
            <br />
            Now you can share your thoughts, images and videos with the people
            you want!
          </p>
        </div>
        <div className={classes["section-about"]}>
          <div className={classes["section-upper"]} onClick={() => toggle(3)}>
            <span className={`${classes["about-title"]} ${
              selected.tipsAndTricks && classes["about-title-expended"]
            }`}>Tips and tricks</span>
            <KeyboardArrowDown
              style={{
                transform: selected.tipsAndTricks ? "rotate(180deg)" : "",
                transition: "transform 300ms ease",
              }}
            />
          </div>
          <ul
            className={`${classes["expended-section-off"]} ${
              selected.tipsAndTricks && classes["expended-section-on"]
            }`}
          >
            <li>
              To <span style={{fontWeight: "600"}}>edit your profile</span>, just go to your profile page (from the
              navigation bar menu, or from the left main menu on desktop) and click on the
              edit button in the top right corner.
            </li>
            <li>Add a <span style={{fontWeight: "600"}}>cover picture</span> from the edit profile page.</li>
            <li>
              Toggle between <span style={{fontWeight: "600"}}>Light Mode</span> and <span style={{fontWeight: "600"}}>Dark Mode</span> easily from the top
              navigation bar or from the settings page.
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default DashboardAbout;
