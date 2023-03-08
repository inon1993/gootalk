import { ImageRounded } from "@mui/icons-material";
import classes from "./UploadPostImg.module.css";

const UploadPostImg = ({ imgToSet }) => {
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    if (!file.type.includes("video") && !file.type.includes("image")) {
      imgToSet({ type: "error", file: "File not supported." });
      setTimeout(() => {
        imgToSet({ type: "", file: "" });
      }, 2500);
      return;
    }
    if (file.type.includes("video")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        imgToSet({ type: "video", file: reader.result });
      };
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      imgToSet({ type: "image", file: reader.result });
    };
  };

  return (
    <>
      <form style={{ marginRight: "15px" }}>
        <label htmlFor="file-input" className={classes["post-img"]}>
          <ImageRounded className={classes["new-post-add-img-icon"]} />
          <span className={classes["new-post-add-img-text"]}>
            Add a Photo/Video
          </span>
        </label>
        <input
          style={{ display: "none" }}
          id="file-input"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value=""
        />
      </form>
    </>
  );
};

export default UploadPostImg;
