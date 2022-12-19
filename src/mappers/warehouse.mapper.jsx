import { DateTime } from "enums/index";
import { formatDate } from "services";

export const warehouseResponse = {
    id: { key: "id" },
    warehouseName: { key: "warehouse" },
    startDate: { 
        transform: ({ src }) => {
            return formatDate(src.start_date, DateTime.A) || "-";
         },
     },
    endDate: { 
        transform: ({ src }) => {
            return formatDate(src.end_date, DateTime.A) || "-";
        },
    },
    description: { 
        transform: ({ src }) => {
            return src.description || "-";
        },
    }
};

export const warehouseOptions = {
    value: { key: "warehouse" },
    text: { key: "warehouse" },
};