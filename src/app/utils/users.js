import axios from "axios";

export const register = async (user) => {
  const res = await axios.post(
    `https://ecom-b10-server.onrender.com/users/register`,
    user
  );
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post(
    `https://ecom-b10-server.onrender.com/users/login`,
    user
  );
  return res.data;
};
