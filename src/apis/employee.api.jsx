import { Get, Post, Put, Delete } from "services";
import { ApiPath } from "paths";

export const getEmployeeById = async ({ id }) => {
  const res = await Get(ApiPath.USERS);
  return res;
};

export const searchEmployees = async (body) => {
  const res = await Post(ApiPath.SEARCH_EMPLOYEE, body);
  return res;
};

export const createEmployee = async (body) => {
  const res = await Post(`${ApiPath.CREATE_EMPLOYEE}`, body);
  return res;
};

export const updateEmployee = async ({ id, body }) => {
  const res = await Put(`${ApiPath.UPDATE_EMPLOYEE(id)}`, body);
  return res;
};

export const deleteEmployee = async ({ employeeId }) => {
  const res = await Delete(`${ApiPath.EMPLOYEE_ID(employeeId)}`);
  return res.data;
};


export const batchDeleteEmployee = async (body) => {
  const res = await Post(`${ApiPath.BATCH_EMPLOYEE}`, body);
  return res.data;
};