import { Field } from "enums";
import Validation from "services/validation.service";
import lang from "translations";
import moment from "moment";

export const initialFormState = (initialState = {}) => {
  const {
    id = '',
    brandName = '',
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
    brandName: {
        name: "brandName",
        value: brandName,
        type: Field.INPUT,
        validations: [Validation.required({})],
        label: lang.brandName
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
