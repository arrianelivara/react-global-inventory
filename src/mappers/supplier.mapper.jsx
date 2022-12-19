import { DateTime } from "enums/index";
import { formatDate } from "services";

export const supplierResponse = {
    id: { key: "id" },
    supplierName: { key: "supplier" },
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
