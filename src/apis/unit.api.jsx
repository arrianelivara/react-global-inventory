import { Get, Post, Put, Delete } from "services";
import { ApiPath } from "paths";

export const getUnit = async (id) => {
  const res = await Get(ApiPath.UNIT_ID(id));
  return res;
};

export const getAllUnits = async () => {
  const res = await Get(`${ApiPath.UNIT}`);
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

export const deleteUnit = async ({ unitId }) => {
  const res = await Delete(`${ApiPath.UNIT_ID(unitId)}`);
  return res.data;
};


export const batchDeleteUnit= async (body) => {
  const res = await Post(`${ApiPath.BATCH_UNIT}`, body);
  return res.data;
};

