import { Get, Post } from "services";
import { ApiPath } from "paths";

export const getJobRole = async (id) => {
  const res = await Get(ApiPath.BRAND_ID(id));
  return res;
};

export const createJobRole = async (body) => {
  const res = await Post(ApiPath.CREATE_JOBROLE, body);
  return res;
};

export const searchJobRole = async (body) => {
  const res = await Post(`${ApiPath.SEARCH_JOBROLE}`, body);
  return res;
};

export const updateJobRole = async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_JOBROLE(id)}`, body);
  return res;
};
