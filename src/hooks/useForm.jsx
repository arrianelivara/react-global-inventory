import { Field } from "enums";
import { useCallback, useEffect, useMemo, useState } from "react";

const useForm = ({ initialState = {}, validation = null }) => {
  const [fields, setFields] = useState({ ...initialState });

  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    validateFields(initialState);
    setFields(setDefaultFields(initialState));
    checkIfFormHasError(initialState, () => {
      setError(true);
    });
  }, [initialState]);

  const modifyForm = useCallback(
    async (fs, makeDirty = true) => {
      if (!dirty && makeDirty) {
        await setDirty(true);
      }

      const cleanedFields = {
        ...removeUninitializedFields(fs, initialState),
      };

      const mergedFields = setDefaultFields(mergeFields(cleanedFields, fields));

      const newFields = runFieldValidations(mergedFields);

      await setFields(newFields);

      // Error checking below

      const hasError = checkIfFormHasError(newFields, async () => {
        await setError(true);
      });

      if (hasError) return { fields: newFields, dirty, error: true };

      // Validate based on custom validation
      if (validation) {
        const { error } = validation(fields);
        if (error) {
          await setError(true);
          return { fields: newFields, dirty, error };
        }
      }

      return { fields: newFields, dirty, error: false };
    },
    [fields, initialState, dirty, validation]
  );

  const modifyField = useCallback(
    async (name, obj) => {
      const { fields: modified } = await modifyForm(
        { [name]: obj },
        obj.hasOwnProperty("dirty") && !obj.dirty ? false : true
      );
      return modified[name];
    },
    [modifyForm]
  );

  const setPristine = useCallback(() => {
    setDirty(false);
    return { dirty };
  }, [dirty]);

  const clearForm = useCallback(() => {
    setDirty(false);
    setError(false);
    setFields(initialState);

    return { fields: initialState, dirty, error };
  }, [initialState, dirty, error]);

  const clearFormV2 = useCallback(() => {
    setDirty(false);
    setError(false);

    return { dirty, error };
  }, [dirty, error]);

  const validateForm = useCallback(() => {
    const dirtyFields = makeFormDirty(fields, () => {
      setDirty(true);
    });
    const validatedFields = runFieldValidations(dirtyFields);

    setFields(validatedFields);

    const hasError = checkIfFormHasError(validatedFields, () => {
      setError(true);
    });

    // Validate based on custom validation
    if (validation) {
      const { error } = validation(fields);
      if (error) {
        setError(true);
        return { fields, dirty, error };
      }
    }

    if (hasError) return { fields: validatedFields, dirty: true, error: true };

    return { fields: validatedFields, dirty: true, error: false };
  }, [fields, validation, dirty]);

  const submitForm = useCallback(
    async (callback) => {
      let response = null;
      const { fields, error } = validateForm();
      if (callback && !error) {
        response = await callback(fields, error);
      }
      return { fields, error, response };
    },
    [validateForm]
  );

  const applyFieldErrors = useCallback(
    (fieldErrors) => {
      let newFields = { ...fields };

      for (const [k, fieldError] of Object.entries(fieldErrors)) {
        if (typeof fieldError !== "string") {
          console.warn(`Error message must be string.`);
          continue;
        }

        if (!fields.hasOwnProperty(k)) {
          console.warn(`Property ${k} is not existing on form. Will disregard.`);
          continue;
        }

        newFields = { ...newFields, [k]: { ...newFields[k], error: true, message: fieldError } };
      }
      setFields(newFields);
      setError(true);
      return { fields: newFields };
    },
    [fields]
  );

  const getFormValues = useCallback(() => {
    return getValues(fields, true);
  }, [fields]);

  const getRawFormValues = useCallback(() => {
    return Object.entries(fields);
  }, [fields]);

  const isFormSubmittable = useMemo(() => {
    let isRequiredFieldsFilled = true;
    for (const [, formValue] of Object.entries(fields)) {
      if (formValue.required && !formValue.value && !formValue.disabled) {
        isRequiredFieldsFilled = false;
      }
    }

    let hasError = false;
    for (const [, formValue] of Object.entries(fields)) {
      if (formValue.error) {
        hasError = true;
      } else if (formValue.isFormArray && !hasError) {
        hasError = formValue.value.some((fv) => {
          return fv.error;
        });
      }
    }

    return dirty && isRequiredFieldsFilled && !hasError;
  }, [dirty, fields]);

  const getFormValuesV1 = useCallback(() => {
    let formValues = {};
    for (const [k, formValue] of Object.entries(fields)) {
      if (formValue.type === Field.INPUT && formValue.value) {
        formValue.value = formValue.value.toString().trim();
      }
      formValues[k] = formValue.value;
    }
    return formValues;
  }, [fields]);

  return {
    fields,
    dirty,
    error,
    modifyForm,
    clearForm,
    clearFormV2,
    modifyField,
    validateForm,
    submitForm,
    applyFieldErrors,
    getFormValues,
    getFormValuesV1,
    isFormSubmittable,
    setPristine,
    getRawFormValues,
    validateField: async (name, field) => {
      const validated = await modifyField(name, field);
      return validated;
    },
  };
};

const validateFields = (fields) => {
  if (Object.keys(fields) <= 0) {
    throw new Error("Fields must have atleast one property");
  }

  for (const [, field] of Object.entries(fields)) {
    if (!field.hasOwnProperty("type")) {
      throw new Error("Field must have a type");
    }

    if (!Field.isValid(field.type)) {
      throw new Error(`${field.type} is not a valid field type`);
    }

    if (field.hasOwnProperty("error") && typeof field.error !== "boolean") {
      throw new Error(`Error must be a boolean`);
    }

    if (field.hasOwnProperty("message") && typeof field.message !== "string") {
      throw new Error(`Message must be a string`);
    }

    if (field.hasOwnProperty("dirty") && typeof field.dirty !== "boolean") {
      throw new Error(`Dirty must be a boolean`);
    }

    if (field.hasOwnProperty("validations") && !Array.isArray(field.validations)) {
      throw new Error(`Validations must be an array`);
    }

    if (field.validations) {
      for (const validation of field?.validations) {
        if (typeof validation !== "function") {
          throw new Error(`Invalid field validation`);
        }
      }
    }
  }
  return fields;
};

const removeUninitializedFields = (fields, initialState) => {
  let newFields = {};
  for (const [k, field] of Object.entries(fields)) {
    // if (!initialState.hasOwnProperty) {
    //   console.warn(`Field ${k} is not declared on initial field state. Will disregard this field.`);
    // } else {
    newFields[k] = field;
    // }
  }
  return newFields;
};

const setDefaultFields = (fields) => {
  let fieldsWithDefault = {};

  for (let [k, field] of Object.entries(fields)) {
    let fieldWithDefault = {
      ...field,
      error: field.error ? field.error : false,
      message: field.message ? field.message : "",
      dirty: field.dirty ? field.dirty : false,
      validations: field.validations ? field.validations : [],
    };

    if (!field.hasOwnProperty("value")) {
      fieldWithDefault = { ...fieldWithDefault, ...setDefaultFieldValues(field) };
    }
    fieldsWithDefault = { ...fieldsWithDefault, [k]: fieldWithDefault };
  }

  return { ...fieldsWithDefault };
};

const setDefaultFieldValues = (field) => {
  const { type } = field;

  if (type === Field.INPUT) {
    field = { ...field, value: null };
  }

  if (type === Field.DROPDOWN) {
    field = { ...field, value: null };
  }

  if (type === Field.MULTIPLE_DROPDOWN) {
    field = { ...field, value: [] };
  }

  if (type === Field.CHECKBOX) {
    field = { ...field, value: null };
  }

  if (type === Field.MULTIPLE_CHECKBOX) {
    field = { ...field, value: [] };
  }

  if (type === Field.RADIO) {
    field = { ...field, value: null };
  }

  if (type === Field.DATE_RANGE) {
    field = { ...field, value: [] };
  }

  if (type === Field.NUMBER) {
    field = { ...field, value: 0 };
  }

  return { value: null, dirty: false, ...field };
};

const mergeFields = (newFields, currentFields) => {
  let newlyMergedFields = {};

  for (const [k, newField] of Object.entries(newFields)) {
    if (currentFields.hasOwnProperty(k)) {
      newlyMergedFields[k] = { ...currentFields[k], ...newField, dirty: true };
    }
  }
  return { ...currentFields, ...newlyMergedFields };
};

const validateField = (formField, options = {}) => {
  const field = { ...formField };

  const { isFormArray, disabled, isFormGroup, pristine } = field || {};
  const isPristine = pristine || options.pristine;
  if (disabled || isPristine) {
    return { ...field, error: false, message: "" };
  }
  if (isFormArray && field.value) {
    field.value = field.value.map((f, index) => {
      return validateField(f, {
        ...options,
        parent: formField,
        index,
        array: formField,
        pristine: isPristine,
      });
    });
  } else if (isFormGroup && field.value) {
    Object.keys(field.value).forEach((fieldKey) => {
      field.value[fieldKey] = validateField(
        { ...field.value[fieldKey], pristine: isPristine },
        {
          ...options,
          parent: formField,
          fieldKey,
          pristine: isPristine,
        }
      );
    });
  }
  let obj = {};
  if (field.validations?.length > 0 && !isPristine) {
    for (const validation of field.validations) {
      const { error, message, ...additionalProperties } = validation(field, options);
      obj = { ...obj, ...additionalProperties };
      if (error) {
        return { ...field, error, message, ...additionalProperties };
      }
    }
  }
  return { ...field, error: false, message: "", ...obj };
};

const checkIfFormHasError = (fields, callback) => {
  let hasError = false;
  for (const [, field] of Object.entries(fields)) {
    if (field.error) {
      callback();
      hasError = true;
      break;
    } else if (field.isFormArray) {
      hasError = field.value.some((fv) => {
        return fv.error;
      });
    }
  }
  return hasError;
};

const runFieldValidations = (fields) => {
  let newFields = {};

  if (validateFields(fields)) {
    for (const [k, field] of Object.entries(fields)) {
      if (field.dirty) {
        const newValue = validateField(field, {
          parent: fields,
          index: k,
          form: fields,
        });
        if (field.pristine) {
          newValue.error = false;
          newValue.message = "";
          newValue.pristine = false;
        }
        newFields = {
          ...newFields,
          [k]: newValue,
        };
      } else {
        newFields = { ...newFields, [k]: field };
      }
    }
  }
  return newFields;
};

const makeFormDirty = (fields, callback) => {
  let dirtyFields = { ...fields };

  for (const [, df] of Object.entries(dirtyFields)) {
    if (!df.dirty) {
      df.dirty = true;
    }
  }

  callback();

  return dirtyFields;
};

const getValues = (fields, isFormGroup = false) => {
  let formValues = {};
  const f = { ...fields };
  if (f?.isFormGroup || isFormGroup) {
    for (const [k, formValue] of Object.entries(isFormGroup ? f : f.value)) {
      let value = null;
      if (formValue.isFormArray) {
        value = formValue?.value?.map((field) => {
          return getValues(field);
        });
      } else {
        value = getValues(formValue);
      }
      formValues[k] = value;
    }
  } else if (f.isFormArray) {
    return false.value.map((field) => {
      return getValues(field);
    });
  } else {
    if (f.type === Field.INPUT && f.value) {
      return f.value.toString().trim();
    } else {
      return f.value;
    }
  }
  return formValues;
};

export default useForm;
