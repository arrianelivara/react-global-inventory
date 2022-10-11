import { Get, Post, Put } from "services";
import { ApiPath } from "paths";

export const getEmployeeById = async ({ id }) => {
  const res = await Get(ApiPath.USERS);
  return res;
};

export const searchEmployees = async () => {
  const res = await Post(ApiPath.USERS);
  return res;
};

export const createEmployee = async ({ username, password }) => {
  const res = await Post("token/", { username, password });
  return res;
};

export const updateEmployee = async ({ username, password }) => {
  const res = await Put("token/", { username, password });
  return res;
};