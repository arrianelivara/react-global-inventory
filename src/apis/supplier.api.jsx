import { Get, Post, Put } from "services";
import { ApiPath } from "paths";

export const getSupplier = async (id) => {
  const res = await Get(ApiPath.SUPPLIER_ID(id));
  return res;
};

export const createSupplier = async (body) => {
  const res = await Post(ApiPath.CREATE_SUPPLIER, body);
  return res;
};

export const searchSupplier = async (body) => {
  console.log(ApiPath.SEARCH_SUPPLIER);
  const res = await Post(`${ApiPath.SEARCH_SUPPLIER}`, body);
  return res;
};

export const updateSupplier = async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_SUPPLIER(id)}`, body);
  return res;
};



