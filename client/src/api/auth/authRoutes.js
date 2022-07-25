import axios from "axios";

export const signup = async (data, profilePicture) => {
  const user = await axios({
    url: "/auth/register",
    method: "POST",
    data: { data, profilePicture },
    // headers: {
    //   withCredentials: true
    // }
  });
  return user;
};

export const login = async (email, password) => {
  const user = await axios({
    url: "/auth/login",
    method: "POST",
    data: { email, password },
    // headers: {
    //   withCredentials: true
    // }
  });
  return user;
};

export const logout = async (accessToken) => {
  await axios.get("/logout", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const uploadImage = async (profilePicture) => {
  try {
    const url = await axios({
      url: "/auth/upload",
      method: "POST",
      data: { profilePicture },
    });
    return url;
  } catch (error) {
    throw new Error(error);
  }
};
