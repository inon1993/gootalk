import { useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import ppIcon from "../../images/pp-icon-biggest.png";
import coverImg from "../../images/gootalk-cover.jpg";
import classes from "./ProfilePicture.module.css";

const ProfilePicture = ({ onId, onPreview, preview, page }) => {
  const [previewSource, setPreviewSource] = useState(preview);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //     onPreview(reader.result);
  //   };
  // };

  const previewFile = (file) => {
    if (!file.type.includes("image")) {
      setPreviewSource({ type: "error", file: "File not supported." });
      onPreview({ type: "error", file: "File not supported." });
      setTimeout(() => {
        setPreviewSource({ type: "", file: "" });
        onPreview({ type: "", file: "" });
      }, 1500);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource({ type: "image", file: reader.result });
      onPreview({ type: "image", file: reader.result });
    };
  };

  return (
    <div className={classes["sl-add-pic"]}>
      <form className={classes["sl-form"]}>
        <label className={classes["check"]} htmlFor={onId}>
          {previewSource.file && previewSource.type !== "error" ? (
            <img
              className={`${
                page === "signup"
                  ? classes["sl-preview-pic"]
                  : page === "edit-profile"
                  ? classes["edit-profile"]
                  : page === "edit-profile-cover" &&
                    classes["edit-profile-cover"]
              }`}
              src={previewSource.file}
              alt="profile pic"
            />
          ) : page === "signup" || page === "edit-profile" ? (
            <img
              className={`${
                page === "signup"
                  ? classes["sl-add-pic-icon"]
                  : classes["edit-profile"]
              } ${previewSource.type === "error" && classes["error-file"]}`}
              src={ppIcon}
              alt="profile icon"
            />
          ) : (
            <img
              className={`${
                page === "edit-profile-cover" && classes["edit-profile-cover"]
              } ${
                previewSource.type === "error" &&
                page === "edit-profile-cover" &&
                classes["error-file-cover"]
              }`}
              src={coverImg}
              alt="profile cover"
            />
          )}
          {(!previewSource.file || previewSource.type === "error") && (
            <AddCircleOutline
              className={`${
                page === "signup"
                  ? classes["add-icon"]
                  : page === "edit-profile"
                  ? classes["edit-profile-add"]
                  : page === "edit-profile-cover" &&
                    classes["edit-profile-cover-add"]
              }`}
            />
          )}
        </label>
        <label>
          {previewSource.file && previewSource.type !== "error" && (
            <RemoveCircleOutline
              className={`${
                page === "signup"
                  ? classes["remove-icon"]
                  : page === "edit-profile"
                  ? classes["edit-profile-remove"]
                  : page === "edit-profile-cover" &&
                    classes["edit-profile-cover-remove"]
              }`}
              onClick={() => {
                setPreviewSource({ type: "", file: "" });
                onPreview({ type: "", file: "" });
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
