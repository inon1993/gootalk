import classes from "./DashboardAbout.module.css";
import Card from "../../UI/Card/Card";
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

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
        <div className={classes["section-about"]} onClick={() => toggle(1)}>
          <div className={classes["section-upper"]}>
            <span className={classes["about-title"]}>Key features</span>
            {selected.keyFeatures ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>
          <ul
            style={{
              maxHeight: selected.keyFeatures ? "9999px" : "0",
              overflow: selected.keyFeatures ? "auto" : "hidden",
              transition: selected.keyFeatures
                ? "max-height 0.5s ease-in-out"
                : "max-height 0.5s ease-in-out",
            }}
          >
            <li>Register with your own user to get connected with friends.</li>
            <li>Share your thoughts with your friends.</li>
            <li>Like and comment on posts.</li>
            <li>Share images and videos with your friends.</li>
            <li>Enjoy a beautiful and responsive UI.</li>
          </ul>
        </div>
        <div className={classes["section-about"]} onClick={() => toggle(2)}>
          <div className={classes["section-upper"]}>
            <span className={classes["about-title"]}>Get started</span>
            {selected.getStarted ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>
          <p
            style={{
              maxHeight: selected.getStarted ? "9999px" : "0",
              overflow: selected.getStarted ? "auto" : "hidden",
              transition: selected.getStarted
                ? "max-height 0.5s ease-in-out"
                : "max-height 0.5s ease-in-out",
            }}
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
        <div className={classes["section-about"]} onClick={() => toggle(3)}>
          <div className={classes["section-upper"]}>
            <span className={classes["about-title"]}>Tips and tricks</span>
            {selected.tipsAndTricks ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDown />
            )}
          </div>
          <ul
            style={{
              maxHeight: selected.tipsAndTricks ? "9999px" : "0",
              overflow: selected.tipsAndTricks ? "auto" : "hidden",
              transition: selected.tipsAndTricks
                ? "max-height 0.5s ease-in-out"
                : "max-height 0.5s ease-in-out",
            }}
          >
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
