import { DateTime } from "enums/index";
import { formatDate } from "services";

export const employeeResponse = {
    id: { key: "id" },
    employeeNo: { key: "employee_id" },
    firstName: { key: "first_name" },
    middleName: { 
        transform: ({ src }) => {
            return src.middle_name || "-";
        },
     },
    lastName: { key: "last_name" },
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
    jobRole: { 
        transform: ({ src }) => {
            return src.job_role || "-";
        },
    },
};

export const employeeData = {
    id: { key: "id" },
    employeeNo: { key: "employee_id" },
    firstName: { key: "first_name" },
    middleName: { key: "middle_name" },
    lastName: { key: "last_name" },
    startDate: { 
        transform: ({ src }) => {
            return formatDate(src.start_date, DateTime.A) || null ;
         },
     },
    endDate: { 
        transform: ({ src }) => {
            return formatDate(src.end_date, DateTime.A) || null;
        },
    },
    jobRole: { 
        transform: ({ src }) => {
            return src.job_role || null;
        },
    },
    warehouse: { 
        transform: ({ src }) => {
            return src.warehouse || null;
        },
    },
    remarks: { key: "remarks" },
    email: { key: "email" },
};

  
  