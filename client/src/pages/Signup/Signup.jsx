import { useState } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import classes from "./Signup.module.css";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";

const Signup = () => {
  const [previewSource, setPreviewSource] = useState({ type: "", file: "" });

  return (
    <div className={classes["signup-wrapper"]}>
      <div className={classes["signup-content-wrapper"]}>
        <div className={classes["signup-left"]}>
          <ProfilePicture
            onId="file-input"
            onPreview={setPreviewSource}
            preview={previewSource}
            page="signup"
          />
        </div>
        <div className={classes["signup-right"]}>
          <SignupForm profilePicture={previewSource} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
