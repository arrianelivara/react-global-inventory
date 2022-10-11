import { Get } from "services";
import { ApiPath } from "paths";

export const getBrand = async () => {
  const res = await Get(ApiPath.USERS);
  return res;
};
