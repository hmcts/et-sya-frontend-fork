import { CaseDate } from 'definitions/case';
import { FormField, FormOptions } from 'definitions/form';

export type DateParser = (
  property: string,
  body: Record<string, unknown>
) => CaseDate

export const convertToDateObject: DateParser = (property, body) =>
  ['day', 'month', 'year'].reduce(
    (newDateObj: any, date: string) => {
      const propertyName = `${property}-${date}`;
      newDateObj[date] = body[propertyName];
      delete body[propertyName];
      return newDateObj;
    },
    { day: '', month: '', year: '' },
  );

type CheckboxParser = (
  isSavingAndSigningOut: boolean
) => ([key, field]: [string, FormField]) => [string, FormField]

export const setupCheckboxParser: CheckboxParser =
  (isSavingAndSigningOut) =>
    ([key, field]) => {
      if ((field as FormOptions)?.type === 'checkboxes') {
        field.parser = (formData: any) => {
          const checkbox = formData[key] ?? [];
          let checkboxValues;
          if ((field as FormOptions).values.length > 1) {
            checkboxValues = checkbox.filter(Boolean);
          } else {
            checkboxValues = checkbox[checkbox.length - 1];
          }

          if (isSavingAndSigningOut && !checkboxValues) {
            checkboxValues = null;
          }

          return [[key, checkboxValues]];
        };
      }
      return [key, field];
    };
