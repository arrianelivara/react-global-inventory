import { Get, Post, Put } from "services";
import { ApiPath } from "paths";

export const getBrand = async (id) => {
  const res = await Get(ApiPath.BRAND_ID(id));
  return res;
};

export const createBrand = async (body) => {
  const res = await Post(ApiPath.CREATE_BRAND, body);
  return res;
};

export const searchBrand = async (body) => {
  const res = await Post(`${ApiPath.SEARCH_BRAND}`, body);
  return res;
};

export const updateBrand = async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_BRAND(id)}`, body);
  return res;
};
