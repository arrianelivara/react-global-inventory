import { Post } from "services";

export const signIn = async ({ email, password }) => {
  const res = await Post("token/", { email, password });
  return res;
};
