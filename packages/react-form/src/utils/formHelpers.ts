import { FieldTypes } from '..';
import { IField } from './fieldTypes';
import { Fields, FieldValue } from './helperTypes';

export interface FormState {
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  values: Record<string, string>;
}

export function getDefaultFieldValue(field: IField): string {
  switch (field.type) {
    case FieldTypes.TEXT:
    case FieldTypes.TEXTAREA:
    case FieldTypes.NUMBER:
      return '';
    case FieldTypes.SELECT:
      return '-placeholder-';
    case FieldTypes.CHECKBOX:
      return 'false';
  }
}

export function getInitialFormState<T extends Fields>(fields: T): FormState {
  const touched: Record<string, boolean> = {};
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};

  for (const [fieldName, field] of Object.entries(fields)) {
    values[fieldName] =
      field.initialValue?.toString() ?? getDefaultFieldValue(field);
    touched[fieldName] = false;
    errors[fieldName] = '';
  }

  return { touched, errors, values };
}

export function formatFieldValue<T extends IField>(
  field: T | undefined,
  stringValue: string,
): FieldValue<T> {
  if (field === undefined)
    throw new Error(`Undefined field could not be decoded`);
  switch (field.type) {
    case FieldTypes.TEXT:
    case FieldTypes.TEXTAREA:
    case FieldTypes.SELECT:
      return stringValue as FieldValue<T>;
    case FieldTypes.CHECKBOX:
      return (stringValue === 'true') as FieldValue<T>;
    case FieldTypes.NUMBER:
      return parseFloat(stringValue) as FieldValue<T>;
  }
}

export function validateField(
  field: IField | undefined,
  value: string | undefined,
): string {
  if (field === undefined) return '';

  // TODO run rules to validate a field
  // console.log(value);

  // Check if the field is required
  // if (
  //   field.validation?.required !== undefined &&
  //   (!value || value === getDefaultValue(field))
  // )
  //   return field.validation.required;

  return '';
}
