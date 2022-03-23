import { DateValidator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../components/form/validator';

import { CaseDate } from './case';
import { InvalidField } from './form';
import { AnyRecord, UnknownRecord } from './util-types';

export const DateValues = [
  {
    label: (l: AnyRecord): string => l.dateFormat.day,
    name: 'day',
    classes: 'govuk-input--width-2',
    attributes: { maxLength: 2 },
  },
  {
    label: (l: AnyRecord): string => l.dateFormat.month,
    name: 'month',
    classes: 'govuk-input--width-2',
    attributes: { maxLength: 2 },
  },
  {
    label: (l: AnyRecord): string => l.dateFormat.year,
    name: 'year',
    classes: 'govuk-input--width-4',
    attributes: { maxLength: 4 },
  },
];

export type DateFormFields = {
  id: string;
  classes: string;
  type: string;
  label: (l: AnyRecord) => string;
  hint: (l: AnyRecord) => string;
  values: typeof DateValues;
  parser: (body: UnknownRecord) => CaseDate;
  validator: DateValidator;
};

export const DefaultDateFormFields = {
  classes: 'govuk-date-input',
  type: 'date',
  label: (l: AnyRecord): string => l.label,
  labelHidden: true,
  hint: (l: AnyRecord): string => l.hint,
  values: DateValues,
  validator: (value: CaseDate): string | void | InvalidField =>
    areDateFieldsFilledIn(value) || isDateInputInvalid(value) || isFutureDate(value),
};
