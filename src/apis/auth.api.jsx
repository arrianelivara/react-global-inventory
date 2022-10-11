import { Post } from "services";

export const signIn = async ({ email, password }) => {
  console.log("email", email);
  const res = await Post("token/", { email, password });
  return res;
};
