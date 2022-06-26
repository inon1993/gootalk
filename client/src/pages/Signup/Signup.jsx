import { AddCircleOutline } from "@mui/icons-material";
import ppIcon from "../../images/pp-icon.png";
import { useState } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import classes from "./Signup.module.css";

const Signup = () => {
  // const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <div className={classes["signup-wrapper"]}>
      <div className={classes["login-left"]}>
        <div className={classes["sl-add-pic"]}>
          <form className={classes["sl-form"]}>
            <label htmlFor="file-input">
              {previewSource ? (
                <img
                  className={classes["sl-preview-pic"]}
                  src={previewSource}
                  alt="profile pic"
                />
              ) : (
                <img
                  className={classes["sl-add-pic-icon"]}
                  src={ppIcon}
                  alt="profile icon"
                />
              )}
              <AddCircleOutline className={classes["add-icon"]} />
            </label>
            <input
              id="file-input"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value=""
            />
          </form>
        </div>
      </div>
      <div className={classes["login-right"]}>
        <SignupForm profilePicture={previewSource} />
      </div>
    </div>
  );
};

export default Signup;
