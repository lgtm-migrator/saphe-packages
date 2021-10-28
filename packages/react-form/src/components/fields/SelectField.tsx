import React, { ReactElement } from 'react';
import { getFieldStyle } from '../../utils/formHelpers';
import { AddFieldPack } from '../../utils/helperTypes';
import { SelectProps } from '../../utils/propTypes';
import FieldText from '../helpers/FieldText';
import FormFieldContainer from '../helpers/FormFieldContainer';

export default function SelectField(props: AddFieldPack<SelectProps>): ReactElement {
  return (
    <FormFieldContainer fieldPack={props.fieldPack}>
      {props.fieldPack?.SELECT ? (
        <props.fieldPack.SELECT {...props} />
      ) : (
        <>
          <label htmlFor={props.id}>{props.label}</label>
          <select
            id={props.id}
            name={props.name}
            value={props.value}
            disabled={props.disabled}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlur}
            aria-describedby={props.describedBy}
            style={getFieldStyle(props.error)}
          >
            <option value="" disabled>
              {props.placeholder ?? ''}
            </option>
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldText {...props} />
        </>
      )}
    </FormFieldContainer>
  );
}
