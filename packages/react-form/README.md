# @saphe/react-form

[![NPM version](https://img.shields.io/npm/v/@saphe/react-form?style=flat-square)](https://npmjs.com/@saphe/react-form)
[![NPM downloads](https://img.shields.io/npm/dt/@saphe/react-form?style=flat-square)](https://npmjs.com/@saphe/react-form)
[![License](https://img.shields.io/npm/l/@saphe/react-form?style=flat-square)](https://github.com/saphewilliam/saphe-packages/blob/main/LICENSE)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@saphe/react-form?style=flat-square)](https://bundlephobia.com/package/@saphe/react-form)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@saphe/react-form?style=flat-square)](https://libraries.io/npm/%40saphe%2Freact-form/)
[![Code coverage](https://img.shields.io/codecov/c/github/saphewilliam/saphe-packages?style=flat-square&flag=react-form&logo=codecov&token=62N8FTE2CV)](https://codecov.io/gh/saphewilliam/saphe-packages)
[![Pull requests welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/saphewilliam/saphe-packages/blob/main/CONTRIBUTING.md)

A lightweight, declarative, type-safe form engine for React apps.

## Table of Contents

- [Roadmap](#roadmap)
- [Getting Started](#getting-started)
- [Docs](#docs)
  * [Field Types](#field-types)
  * [Validation Modes](#validation-modes)
  * [Kitchen Sink](#kitchen-sink)

## Roadmap

- [ ] Support dynamically hiding and disabling fields
- [ ] Support lists of values
- [ ] Support form layouts (advanced form field container with layout grid)
- [ ] Field modifiers (transform a string to uppercase or round a number (floor or ceil))
- [ ] Support localization out of the box
- [ ] Support defining custom field types
- [ ] Create supported field packs:
  - [x] Bootstrap 5
  - [ ] TailwindCSS
  - [ ] Material UI
  - [ ] ChackraUI

## Getting Started

Install using pnpm:

```sh
pnpm i @saphe/react-form
```

or install using yarn:

```sh
yarn add @saphe/react-form
```

or install using npm:

```sh
npm install @saphe/react-form
```

<!-- END AUTO-GENERATED: Add custom documentation after this comment -->

## Docs

### Field Types

- TEXT
- TEXT_AREA
- SELECT
- CHECK
- NUMBER
- FILE
- EMAIL
- PASSWORD
- NEW_PASSWORD
- COLOR
- DATE
- TIME
- DATE_TIME
- MONTH
- More to come...
  - IMAGE
  - RADIO
  - RANGE
  - PHONE
  - RATING
  - CRSF
  - NOTICE

### Validation Modes

| Mode                                       | Behavior                                                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------- |
| `ValidationModes.AFTER_BLUR` **(default)** | Don't validate a field until it has been blurred once, then validate it on change |
| `ValidationModes.ON_CHANGE`                | Validate a field with every change                                                |
| `ValidationModes.ON_BLUR`                  | Only validate the field once a user is done typing                                |
| `ValidationModes.ON_SUBMIT`                | The field will only validate in the event of a form submission                    |

You can assign a global validation mode by assigning it to the config object suppied to `useForm`. You can also assign field-specific validation modes by assigning them to the field config. The local validation modes take presidence over the global ones.

```ts
const form = useForm({
  // ...other form config
  validationMode: ValidationModes.ON_BLUR,
  fields: {
    fieldExample: {
      // ...other field config
      validation: {
        mode: ValidationModes.ON_CHANGE,
      },
    },
  },
});
```

### Kitchen Sink

```ts
import useForm, { Field, ValidationMode } from '@saphe/react-form';
import BootstrapFieldPack from '@saphe/react-form-fields-bootstrap';

const { form, submitButton, formState } = useForm({
  /** Required, the name of this form. Necessary for the use of IDs */
  name: 'contactForm',

  /** Required, declares the fields of the form */
  fields: {
    name: {
      type: Field.TEXT,
      label: 'Name',
      description: 'Please enter your full name',
      placeholder: 'Enter your name...',
      validation: {
        required: 'Name is a required field',
        validate: async (value) => {
          if (value === 'Rick Astley') return '';
          else return 'This value did not pass the vibe check';
        },
      },
    },
    subject: {
      type: Field.SELECT,
      label: 'Subject',
      placeholder: 'Choose a subject from the list...',
      options: [
        { label: 'Meeting', value: '1' },
        { label: 'Quote', value: '2' },
        { label: 'Other', value: '3' },
      ],
      validation: {
        required: 'Subject is a required field',
      },
    },
    message: {
      type: Field.TEXTAREA,
      label: 'Message',
      initialValue: '5 stars!',
      validation: {
        required: 'Message is a required field',
      },
    },
  },

  /** Optional, defines the form fields used for this form */
  fieldPack: BootstrapFieldPack,

  /** Optional, defines the global form validation mode. Defaults to `ValidationMode.AFTER_BLUR` */
  validationMode: ValidationMode.AFTER_BLUR,

  /** Optional, adds a recaptcha check to the form */
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    locale: 'en',
    onError: () => alert('Please confirm you are not a robot'),
  },

  /** Optional, the void function that fires on a form change event */
  onChange: async (formValues, fieldName) => {
    console.log('change', fieldName, formValues);
  },

  /** Optional, the void function that fires on a form blur event */
  onBlur: async (formValues, fieldName) => {
    console.log('blur', fieldName, formValues);
  },

  /** Optional, the void function that fires on a form submission event */
  onSubmit: async (formValues, { recaptchaToken }) => {
    console.log(formValues, recaptchaToken);
  },
});
```
