export const warehousePaths = {
    WAREHOUSE: "",
    SEARCH_WAREHOUSE: "search",
    WAREHOUSE_ID: (warehouseId) => warehouseId,
    CREATE_WAREHOUSE: "create",
    UPDATE_WAREHOUSE: (warehouseId) => `update/${warehouseId}`,
    BATCH_WAREHOUSE: "batch-warehouse"
};
  