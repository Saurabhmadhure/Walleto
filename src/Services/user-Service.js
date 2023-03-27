import { myAxios } from "./Helper";

export const signUp = async (user) => {
  const response = await myAxios.post("/users/register", user);
  return response.data;
};
export const loginUser = async (loginDetails) => {
  const response = await myAxios.post("/users/login", loginDetails);
  return response.data;
};
export const availableBalance = (id) => {
  const response = myAxios.post(`/all/acc/${id}`, id);
  return response.data;
};
export const deposit = (amount) => {
  const response = myAxios.post("/all/login/", amount);
  return response.data;
};

export const sendMoney = (info) => {
  const response = myAxios.post("/all/send", info);
  return response.data;
};
export const logOut = () => {
  const response = myAxios.post("/users/logout");
  return response.data;
};
