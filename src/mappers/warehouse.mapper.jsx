import { DateTime } from "enums/index";
import { formatDate } from "services";

export const warehouseResponse = {
    id: { key: "id" },
    warehouseName: { key: "warehouse" },
    startDate: { 
        transform: ({ src }) => {
            return formatDate(src.start_date, DateTime.L) || "-";
         },
     },
    endDate: { 
        transform: ({ src }) => {
            return formatDate(src.end_date, DateTime.L) || "-";
        },
    },
    description: { 
        transform: ({ src }) => {
            return src.description || "-";
        },
    }
};
