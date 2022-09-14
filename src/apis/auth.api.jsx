import { Post } from "services";
import { ApiPath } from "paths";

export const signIn = async ({ email, password }) => {
  const body = {
    email,
    password,
  };
  const res = await Post(`${ApiPath.SIGN_IN}`, body);
  return res.data;
};
