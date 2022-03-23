import { expect } from 'chai';
import request from 'supertest';

import { app } from '../../../main/app';

const PAGE_URL = '/communicating';
const titleClass = 'govuk-fieldset__heading';
const expectedTitle = 'I need help communicating and understanding';
const buttonClass = 'govuk-button';
const inputs = 'govuk-checkboxes__input';
const checkboxItem = 'govuk-checkboxes__item';
const expectedInputLabel = 'govuk-label';

let htmlRes: Document;
describe('I need help communicating page', () => {
  beforeAll(async () => {
    await request(app)
      .get(PAGE_URL)
      .then(res => {
        htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
      });
  });

  it('should display title', () => {
    const title = htmlRes.getElementsByClassName(titleClass);
    expect(title[0].innerHTML).contains(expectedTitle, 'Page title does not exist');
  });

  it('should display continue button', () => {
    const button = htmlRes.getElementsByClassName(buttonClass);
    expect(button[0].innerHTML).contains('Save and continue', 'Could not find the button');
  });

  it('should display checkboxes', () => {
    const checkboxes = htmlRes.getElementsByClassName(inputs);
    expect(checkboxes.length).greaterThan(0, `only ${checkboxes.length} found`);
  });

  it('should display checkboxes with valid labels', () => {
    const checkboxItems = htmlRes.getElementsByClassName(checkboxItem);
    expect(checkboxItems[0].innerHTML).contains(
      expectedInputLabel,
      'Could not find the checkboxes with label ' + expectedInputLabel
    );
  });
});
