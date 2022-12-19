export const supplierPaths = {
    SUPPLIER: "",
    SEARCH_SUPPLIER: "search",
    SUPPLIER_ID: (supplierId) => supplierId,
    CREATE_SUPPLIER: "create",
    UPDATE_SUPPLIER: (supplierId) => `update/${supplierId}`,
    BATCH_SUPPLIER: "batch-supplier"
};
  