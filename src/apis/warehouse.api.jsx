import { Get, Post, Put } from "services";
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

export const getAllWarehouse = async () => {
  const res = await Get(`${ApiPath.WAREHOUSE}`);
  return res;
};

export const deleteWarehouse = async ({ warehouseId }) => {
  const res = await Delete(`${ApiPath.WAREHOUSE_ID(warehouseId)}`);
  return res.data;
};

export const batchDeleteWarehouse= async (body) => {
  const res = await Post(`${ApiPath.BATCH_WAREHOUSE}`, body);
  return res.data;
};