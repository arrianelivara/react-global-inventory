import { Get, Post, Put, Delete } from "services";
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
  const res = await Post(`${ApiPath.SEARCH_SUPPLIER}`, body);
  return res;
};

export const updateSupplier = async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_SUPPLIER(id)}`, body);
  return res;
};

export const getAllSupplier = async () => {
  const res = await Get(ApiPath.SUPPLIER);
  return res;
};

export const deleteSupplier = async ({ supplierId }) => {
  const res = await Delete(`${ApiPath.SUPPLIER_ID(supplierId)}`);
  return res.data;
};


export const batchDeleteSupplier= async (body) => {
  const res = await Post(`${ApiPath.BATCH_SUPPLIER}`, body);
  return res.data;
};

