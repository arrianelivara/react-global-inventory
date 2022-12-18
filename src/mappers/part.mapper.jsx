import { DateTime } from "enums/index";
import { formatDate } from "services";

export const partResponse = {
    id: { key: "id" },
    partNo: { key: "part" },
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
