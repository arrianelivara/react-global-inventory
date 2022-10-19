import { Get, Post, Put } from "services";
import { ApiPath } from "paths";

export const getUnit = async (id) => {
  const res = await Get(ApiPath.UNIT_ID(id));
  return res;
};

export const createUnit = async (body) => {
  const res = await Post(ApiPath.CREATE_UNIT, body);
  return res;
};

export const searchUnit = async (body) => {
  const res = await Post(`${ApiPath.SEARCH_UNIT}`, body);
  return res;
};

export const updateUnit= async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_UNIT(id)}`, body);
  return res;
};



