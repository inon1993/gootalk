import axios from "axios";

export const signup = async (data) => {
  const user = await axios({
    url: "auth/register",
    method: "POST",
    data: data,
  });
  return user;
};

export const login = async (email, password) => {
  const user = await axios({
    url: "auth/login",
    method: "POST",
    data: { email, password },
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
