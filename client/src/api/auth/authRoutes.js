import axios from "axios";

export const signup = async (data) => {
  console.log(data);
  const user = await axios({
    url: "auth/register",
    method: "POST",
    data: data,
  });
  console.log(user);
  return user;
};
