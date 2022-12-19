export const jobRolePaths = {
    JOB_ROLE: "",
    SEARCH_JOBROLE: "search",
    JOBROLE_ID: (jobRoleId) => jobRoleId,
    CREATE_JOBROLE: "create",
    UPDATE_JOBROLE: (jobRoleId) => `update/${jobRoleId}`,
    BATCH_JOBROLE: "batch-jobrole"
};
  