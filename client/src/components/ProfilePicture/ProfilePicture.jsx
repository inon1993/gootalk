import { useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import ppIcon from "../../images/pp-icon-biggest.png";
import classes from "./ProfilePicture.module.css";

const ProfilePicture = ({ onId, onPreview }) => {
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
      onPreview(reader.result);
    };
  };

  return (
    <div className={classes["sl-add-pic"]}>
      <form className={classes["sl-form"]}>
        <label htmlFor={onId}>
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
          {!previewSource && (
            <AddCircleOutline className={classes["add-icon"]} />
          )}
        </label>
        <label>
          {previewSource && (
            <RemoveCircleOutline
              className={classes["remove-icon"]}
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
