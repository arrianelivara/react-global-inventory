import { Get } from "services";
import { ApiPath } from "paths";

export const getUsers = async () => {
  const res = await Get(ApiPath.USERS);
  return res.data;
};
