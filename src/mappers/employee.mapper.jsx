import { DateTime } from "enums/index";
import { formatDate } from "services";

export const employeeResponse = {
    employeeNo: { key: "employee_id" },
    firstName: { key: "first_name" },
    middleName: { key: "middle_name" },
    lastName: { key: "last_name" },
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
    jobRole: { key: "job_role"},
};

  
  