import { Field } from "enums";
import Validation from "services/validation.service";
import lang from "translations";
import moment from "moment";

export const initialFormState = (initialState = {}) => {
  const {
    id,
    employeeNo,
    firstName,
    middleName,
    lastName,
    jobRole,
    startDate = null,
    endDate = null,
    remarks,
    email,
    warehouse
  } = initialState;

  return {
    id: {
      name: "id",
      value: id,
      type: Field.INPUT,
    },
    employeeNo: {
      name: "employeeNo",
      label: lang.employeeNumber,
      value: employeeNo,
      type: Field.INPUT,
      maxLength: 75,
      validations: [Validation.required({})],
    },
    firstName: {
      name: "firstName",
      label: lang.firstName,
      value: firstName,
      type: Field.INPUT,
      validations: [Validation.required({})],
      maxLength: 75,
    },
    middleName: {
      name: "middleName",
      label: lang.middleName,
      value: middleName,
      type: Field.INPUT,
      maxLength: 75,
    },
    lastName: {
      name: "lastName",
      label: lang.lastName,
      value: lastName,
      type: Field.INPUT,
      validations: [Validation.required({})],
      maxLength: 75,
    },
    jobRole: {
      name: "jobRole",
      label: lang.jobRole,
      value: jobRole,
      type: Field.INPUT,
      validations: [Validation.required({})],
      maxLength: 75,
    },
    warehouse: {
      name: "warehouse",
      label: lang.warehouse,
      value: warehouse,
      type: Field.INPUT,
      validations: [Validation.required({})],
      maxLength: 75,
    },
    startDate: {
      name: "startDate",
      label: lang.startDate,
      value: startDate === "-" || startDate === null ? moment() : moment(startDate),
      type: Field.DATE_RANGE,
    },
    endDate: {
      name: "endDate",
      label: lang.endDate,
      value: endDate === "-" || endDate === null ? null : moment(endDate),
      type: Field.ANY,
    },
    remarks: {
      name: "remarks",
      value: remarks,
      label: lang.remarks,
      type: Field.INPUT,
    },
    email: {
      name: "email",
      value: email,
      label: lang.email,
      type: Field.INPUT,
      validations: [Validation.required({}), Validation.validEmail()],
    },
  }

};
