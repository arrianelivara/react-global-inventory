import { Field } from "enums";
import Validation from "services/validation.service";

export const initialFormState = {
  email: {
    name: "email",
    placeholder: "Enter email address",
    value: null,
    type: Field.INPUT,
    maxLength: 75,
    validations: [Validation.required({})],
  },
  password: {
    name: "password",
    placeholder: "Password",
    value: null,
    type: Field.INPUT,
    validations: [Validation.required({})],
    maxLength: 75,
    inputType: "password",
  },
  rememberMe: {
    name: "rememberMe",
    value: null,
    type: Field.CHECKBOX,
  },
};
