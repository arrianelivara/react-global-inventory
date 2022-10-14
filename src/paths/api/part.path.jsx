export const partPaths = {
    PART: "",
    SEARCH_PART: "search",
    PART_ID: (partId) => partId,
    CREATE_PART: "create",
    UPDATE_PART: (partId) => `update/${partId}`
};
  