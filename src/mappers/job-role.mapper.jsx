import { DateTime } from "enums/index";
import { formatDate } from "services";

export const jobRolesResponse = {
    id: { key: "id" },
    jobRoleName: { key: "job_role" },
    startDate: { key: "start_date" },
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
  
  