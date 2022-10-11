import { Get, Post } from "services";
import { ApiPath } from "paths";

export const getUsers = async () => {
  const res = await Get(ApiPath.USERS);
  return res.data;
};

export const signIn = async ({ username, password }) => {
  const res = await Post("token/", { username, password });
  return res;
};