import { uploadImage } from "../auth/authRoutes";

export const getPictureUrl = async (picture) => {
    if (picture) {
      const imgUrl = await uploadImage(picture);
      return imgUrl.data.url;
    } else {
      return null;
    }
  };