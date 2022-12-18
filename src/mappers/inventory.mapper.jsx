import { DateTime } from "enums/index";
import { formatDate } from "services";

export const inventorySummaryListResponse = {
    id: { key: "id" },
    description: { 
        transform: ({ src }) => {
            return src.description || "-";
        },
    },
    partNo: { key: "part"},
    quantity: { key: "remaining_stock" },
    brand: { key: "brand"},
    unit: { key: "unit"},
    otherPart: { key: "other_part"},
    dateUpdated: { 
        transform: ({ src }) => {
            return formatDate(src.updatedAt, DateTime.L);
        },
    },
    warehouse: { key: "warehouse"},
    supplier: { key: "supplier"}
};