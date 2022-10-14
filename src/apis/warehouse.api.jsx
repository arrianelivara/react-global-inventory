import { Get, Post } from "services";
import { ApiPath } from "paths";

export const getWarehouse = async (id) => {
  const res = await Get(ApiPath.WAREHOUSE_ID(id));
  return res;
};

export const createWarehouse = async (body) => {
  const res = await Post(ApiPath.CREATE_WAREHOUSE, body);
  return res;
};

export const searchWarehouse = async (body) => {
  const res = await Post(`${ApiPath.SEARCH_WAREHOUSE}`, body);
  return res;
};

export const updateWarehouse = async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_WAREHOUSE(id)}`, body);
  return res;
};



