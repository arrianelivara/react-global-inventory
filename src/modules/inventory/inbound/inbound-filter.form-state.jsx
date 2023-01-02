import { Field } from "enums";
import moment from "moment";
import Validation from "services/validation.service";

export const initialFormState = () => {
  return {
    invoiceDate: {
      name: "invoiceDate",
      value: moment(),
      type: Field.DATE_RANGE,
    },
    invoiceNumber: {
        name: "invoiceNumber",
        value: null,
        type: Field.INPUT,
    },
    supplier: {
        name: "supplier",
        value: null,
        type: Field.DROPDOWN,
        placeholder: "Select a Supplier..."
    },
    warehouse: {
        name: "warehouse",
        value: null,
        type: Field.DROPDOWN,
        placeholder: "Select a Warehouse..."
    },
    parts: {
      name: "parts",
      type: Field.ANY,
      value: [],
      isFormArray: true
    }
  }
};

export const PartField = {
  id: {
    name: "id",
    type: Field.ANY,
    value: null,
  },
  partNo: {
    name: "partNo",
    type: Field.DROPDOWN,
    validations: [Validation.required()],
    label: "Part No.",
    value: null,
  },
  description: {
    name: "description",
    type: Field.INPUT,
    label: "Description",
    value: null,
  },
  brand: {
    name: "brand",
    type: Field.DROPDOWN,
    label: "Brand",
    value: null,
  },
  remainingStocks: {
    name: "remainingStocks",
    type: Field.INPUT,
    label: "Remaining Stocks",
    value: null,
  },
  quantity: {
    name: "quantity",
    type: Field.INPUT,
    label: "Quantity",
    value: null,
  },
  unit: {
    name: "unit",
    type: Field.DROPDOWN,
    label: "Unit",
    value: null,
  },
}

