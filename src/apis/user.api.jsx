import { Get, Delete } from "services";
import { ApiPath } from "paths";

export const getUsers = async () => {
  const res = await Get(ApiPath.USERS);
  return res.data;
};

export const deleteUser = async ({ userId }) => {
  const res = await Delete(`${ApiPath.USER_ID(userId)}`);
  return res.data;
};