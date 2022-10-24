import { textFieldPlugin } from '../src/lib/plugin';
import { renderHook } from '@testing-library/react';
import useForm from '../src';
import { expectTypeOf } from 'expect-type';

const plugins = {
  fields: {
    text: textFieldPlugin,
  },
};

describe('useForm', () => {
  // TODO describe FieldBuilder
  it('provides type-safe input of form fields based on the provided plugins', () => {
    renderHook(() =>
      useForm(plugins, {
        fields: (t) => ({
          // @ts-expect-error Unknown plugin
          unknownPlugin: t.field.unknown({}),
          // @ts-expect-error Unknown option
          unknownOption: t.field.text({ unknown: 'test' }),

          // @ts-expect-error Incorrect initial value type
          incorrectType: t.field.text({ initialValue: 10 }),
          // @ts-expect-error Many is undefined, it should not accept an array by default
          manyUndefined: t.field.text({ initialValue: ['Array of strings'] }),
          // @ts-expect-error Many is false, it should not accept an array
          manyFalse: t.field.text({ many: false, initialValue: ['Array of strings'] }),
          // @ts-expect-error Many is true, it should not accept a string
          manyTrue: t.field.text({ many: true, initialValue: 'String' }),
          correctManyUndefined: t.field.text({ initialValue: 'String' }),
          correctManyFalse: t.field.text({ many: false, initialValue: 'String' }),
          correctManyTrue: t.field.text({ many: true, initialValue: ['Array of strings'] }),
          manyUndefinedNull: t.field.text({ initialValue: null }),
          manyFalseNull: t.field.text({ many: false, initialValue: null }),
          // @ts-expect-error Many is true, it should not accept null
          manyTrueNull: t.field.text({ many: true, initialValue: null }),
          manyTrueNullArray: t.field.text({ many: true, initialValue: [null] }),

          exposeCustomOption: t.field.text({ placeholder: 'String' }),
          // TODO
          // exposeCustomValidation: t.field.text({ validation: {length} }),
          // exposeCustomState: t.field.text({ state: 'hidden' }), expect error
          // @todo-ts-expect-error only fields and fieldSets are allowed in the fields object
          // randomObject: { thisShould: 'notBeAllowed' },
        }),
      }),
    );
  });

  it('Generates a type-safe submit action based on the specified form fields', () => {
    renderHook(() =>
      useForm(plugins, {
        fields: (t) => ({
          text: t.field.text({}),
          textNotMany: t.field.text({ many: false }),
          textMany: t.field.text({ many: true }),
          textReq: t.field.text({ validation: { required: 'req' } }),
          textReqNotMany: t.field.text({ many: false, validation: { required: 'req' } }),
          textReqMany: t.field.text({ many: true, validation: { required: 'req' } }),
          obj: t.fieldSet({
            fields: {
              nestedText: t.field.text({}),
              nestedTextNotMany: t.field.text({ many: false }),
              nestedTextMany: t.field.text({ many: true }),
              nestedTextReq: t.field.text({ validation: { required: 'req' } }),
              nestedTextReqNotMany: t.field.text({ many: false, validation: { required: 'req' } }),
              nestedTextReqMany: t.field.text({ many: true, validation: { required: 'req' } }),
            },
          }),
          // TODO
          // arr: t.fieldSet({
          //   many: true,
          //   fields: {

          //   }
          // })
        }),
        onSubmit(formState) {
          expectTypeOf(formState).not.toBeAny();
          expectTypeOf(formState).not.toHaveProperty('random');
          expectTypeOf(formState).toHaveProperty('formValues');

          const v = formState.formValues;
          expectTypeOf(v).not.toBeAny();
          expectTypeOf(v).not.toHaveProperty('random');

          expectTypeOf(v).toHaveProperty('text').toEqualTypeOf<string | null>();
          expectTypeOf(v).toHaveProperty('textNotMany').toEqualTypeOf<string | null>();
          expectTypeOf(v).toHaveProperty('textMany').toEqualTypeOf<(string | null)[]>();
          expectTypeOf(v).toHaveProperty('textReq').toEqualTypeOf<string>();
          expectTypeOf(v).toHaveProperty('textReqNotMany').toEqualTypeOf<string>();
          expectTypeOf(v).toHaveProperty('textReqMany').toEqualTypeOf<string[]>();

          expectTypeOf(v).toHaveProperty('obj').not.toBeAny();
          expectTypeOf(v).toHaveProperty('obj').not.toBeNullable();
          expectTypeOf(v).toHaveProperty('obj').not.toHaveProperty('random');

          const o = v.obj;
          expectTypeOf(o).toHaveProperty('nestedText').toEqualTypeOf<string | null>();
          expectTypeOf(o).toHaveProperty('nestedTextNotMany').toEqualTypeOf<string | null>();
          expectTypeOf(o).toHaveProperty('nestedTextMany').toEqualTypeOf<(string | null)[]>();
          expectTypeOf(o).toHaveProperty('nestedTextReq').toEqualTypeOf<string>();
          expectTypeOf(o).toHaveProperty('nestedTextReqNotMany').toEqualTypeOf<string>();
          expectTypeOf(o).toHaveProperty('nestedTextReqMany').toEqualTypeOf<string[]>();
        },
      }),
    );
  });
});