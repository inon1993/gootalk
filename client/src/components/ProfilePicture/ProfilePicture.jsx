import { useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import ppIcon from "../../images/pp-icon-biggest.png";
import classes from "./ProfilePicture.module.css";

const ProfilePicture = ({ onId, onPreview, preview, page }) => {
  const [previewSource, setPreviewSource] = useState(preview);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      onPreview(reader.result);
    };
  };

  return (
    <div className={classes["sl-add-pic"]}>
      <form className={classes["sl-form"]}>
        <label htmlFor={onId}>
          {previewSource ? (
            <img
              className={`${page === "signup" ? classes["sl-preview-pic"] : classes["edit-profile"]}`}
              src={previewSource}
              alt="profile pic"
            />
          ) : (
            <img
              className={`${page === "signup" ? classes["sl-add-pic-icon"] : classes["edit-profile"]}`}
              src={ppIcon}
              alt="profile icon"
            />
          )}
          {!previewSource && (
            <AddCircleOutline className={`${page === "signup" ? classes["add-icon"] : classes["edit-profile-add"]}`} />
          )}
        </label>
        <label>
          {previewSource && (
            <RemoveCircleOutline
              className={`${page === "signup" ? classes["remove-icon"] : classes["edit-profile-remove"]}`}
              onClick={() => {
                setPreviewSource();
                onPreview();
              }}
            />
          )}
        </label>
        <input
          id={onId}
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value=""
        />
      </form>
    </div>
  );
};

export default ProfilePicture;
