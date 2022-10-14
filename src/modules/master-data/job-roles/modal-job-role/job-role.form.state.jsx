import { Field } from "enums";
import Validation from "services/validation.service";
import lang from "translations";

export const initialFormState = (initialState = {}) => {
  const {
    jobRoleName = '',
    description = '',
    startDate = null,
    endDate = null,
  } = initialState;

  return {
    jobRoleName: {
        name: "jobRoleName",
        value: jobRoleName,
        type: Field.INPUT,
        validations: [Validation.required({})],
        label: lang.jobRole
    },
    description: {
        name: "description",
        value: description,
        type: Field.INPUT,
        label: lang.description
    },
    startDate: {
        name: "startDate",
        value: startDate,
        type: Field.DATE_RANGE,
        label: lang.startDate
    },
    endDate: {
        name: "endDate",
        value: endDate,
        type: Field.DATE_RANGE,
        label: lang.endDate
    },
  }
};
