Feature('ET pages while employee not working for organisation');
const testUrl = '/are-you-still-working';
const authPage = require('./authPage.js');
const { I } = inject();

Scenario('Pages while not working for the organisation', () => {
  I.amOnPage(testUrl);
  authPage.login();
  I.amOnPage(testUrl);

  I.seeElement('#still-working-3');
  I.checkOption('input[id=still-working-3]');
  I.click('#main-form-submit');

  I.seeElement('#job-title');
  I.fillField('#job-title', 'Tester');
  I.click('#main-form-submit');

  I.seeElement('#start-date-day');
  I.fillField('#start-date-day', '20');
  I.fillField('#start-date-month', '04');
  I.fillField('#start-date-year', '2014');
  I.click('#main-form-submit');
  authPage.logout();
})
  .tag('@RET-1131')
  .tag(' @RET-BAT');
