import { Get, Post, Put, Delete } from "services";
import { ApiPath } from "paths";

export const getPart = async (id) => {
  const res = await Get(ApiPath.PART_ID(id));
  return res;
};

export const getAllParts = async () => {
  const res = await Get(`${ApiPath.PART}`);
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

export const deletePart = async ({ partId }) => {
  const res = await Delete(`${ApiPath.PART_ID(partId)}`);
  return res.data;
};


export const batchDeletePart= async (body) => {
  const res = await Post(`${ApiPath.BATCH_PART}`, body);
  return res.data;
};
