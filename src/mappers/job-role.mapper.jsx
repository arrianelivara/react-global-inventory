import { DateTime } from "enums/index";
import { formatDate } from "services";

export const jobRolesResponse = {
    id: { key: "id" },
    jobRoleName: { key: "job_role" },
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

export const jobRolesOptions = {
    value: { key: "job_role" },
    text: { key: "job_role" },
};
  
  