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
  partNo: {
    name: "partNo",
    type: Field.INPUT,
    validations: [Validation.required()],
    label: "Part No."
  },
  description: {
    name: "description",
    type: Field.INPUT,
    label: "Description"
  },
  brand: {
    name: "brand",
    type: Field.DROPDOWN,
    label: "Brand"
  },
  remainingStocks: {
    name: "remainingStocks",
    type: Field.INPUT,
    label: "Remaining Stocks"
  },
  quantity: {
    name: "quantity",
    type: Field.INPUT,
    label: "Quantity"
  },
  unit: {
    name: "unit",
    type: Field.DROPDOWN,
    label: "Unit"
  },
}

