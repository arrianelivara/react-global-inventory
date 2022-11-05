import { Field } from "enums";
import Validation from "services/validation.service";
import lang from "translations";
import moment from "moment";

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
        value: startDate ? moment(startDate) : null,
        type: Field.DATE_RANGE,
        label: lang.startDate
    },
    endDate: {
        name: "endDate",
        value: endDate ? moment(endDate) : null,
        type: Field.DATE_RANGE,
        label: lang.endDate
    },
  }
};
