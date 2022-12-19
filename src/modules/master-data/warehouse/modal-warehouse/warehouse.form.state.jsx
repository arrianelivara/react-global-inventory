import { Field } from "enums";
import Validation from "services/validation.service";
import lang from "translations";
import moment from "moment";

export const initialFormState = (initialState = {}) => {
  const {
    id = null,
    warehouseName = '',
    description = '',
    startDate = null,
    endDate = null,
  } = initialState;

  return {
    id: {
      name: "id",
      value: id,
      type: Field.INPUT,
    }, 
    warehouseName: {
        name: "warehouseName",
        value: warehouseName,
        type: Field.INPUT,
        validations: [Validation.required({})],
        label: lang.warehouseName
    },
    description: {
        name: "description",
        value: description === "-" ? null : description,
        type: Field.INPUT,
        label: lang.description
    },
    startDate: {
        name: "startDate",
        value: startDate === "-" || startDate === null ? null : moment(startDate),
        type: Field.DATE_RANGE,
        label: lang.startDate
    },
    endDate: {
        name: "endDate",
        value: endDate === "-" || endDate === null ? null : moment(endDate),
        type: Field.DATE_RANGE,
        label: lang.endDate
    },
  }
};
