import { Field } from "enums";

const initialFormState = () => {
  return {
    warehouse: {
      name: "warehouse",
      value: null,
      type: Field.DROPDOWN,
      tooltipMsg: "Filter out the result by Warehouse Name"
    },
  };
};

export default initialFormState;
