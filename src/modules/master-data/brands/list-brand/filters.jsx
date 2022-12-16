export const brandFilterState = (sortBy) => ({
  pageSize: 10,
  currentPage: 1,
  sortBy: sortBy || "start_date",
});
