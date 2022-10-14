import { Get, Post } from "services";
import { ApiPath } from "paths";

export const getPart = async (id) => {
  const res = await Get(ApiPath.PART_ID(id));
  return res;
};

export const createPart = async (body) => {
  const res = await Post(ApiPath.CREATE_PART, body);
  return res;
};

export const searchPart = async (body) => {
  const res = await Post(`${ApiPath.SEARCH_PART}`, body);
  return res;
};

export const updatePart = async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_PART(id)}`, body);
  return res;
};



