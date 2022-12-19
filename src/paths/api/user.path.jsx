export const userPaths = {
  EMPLOYEE: "",
  SEARCH_EMPLOYEE: "search",
  EMPLOYEE_ID: (employeeId) => employeeId,
  CREATE_EMPLOYEE: "create",
  UPDATE_EMPLOYEE: (employeeId) => `update/${employeeId}`,
  BATCH_EMPLOYEE: "batch-employee"
};
