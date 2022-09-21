'use strict';
const commonConfig = require('../../features/Data/commonConfig.json');

module.exports = async function (noticePeriodContract, noticePeriod) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const I = this;
  //check page title and enter job title
  I.see('Employment details');
  I.seeElement('#jobTitle');
  I.fillField('#jobTitle', 'Tester');
  I.click(commonConfig.saveAndContinue);

  //employment start date page
  I.seeElement('#startDate-day');
  I.fillField('#startDate-day', '20');
  I.fillField('#startDate-month', '04');
  I.fillField('#startDate-year', '2014');
  I.click(commonConfig.saveAndContinue);

  //employment if statement to select notice period within contract
  I.seeElement('#notice-period');
  if (noticePeriodContract === 'Yes written contract with notice period') {
    I.checkOption('input[id=notice-period]');
    I.click(commonConfig.saveAndContinue);
    if (noticePeriod === 'Weeks') {
      I.seeElement('#notice-type');
      I.checkOption('input[id=notice-type]');
      I.click(commonConfig.saveAndContinue);

      I.seeElement('#notice-length');
      I.fillField('input[id=notice-length]', '4');
      I.click(commonConfig.saveAndContinue);
    } else if (noticePeriod === 'Months') {
      I.seeElement('#notice-type-2');
      I.checkOption('input[id=notice-type-2]');
      I.click(commonConfig.saveAndContinue);

      I.seeElement('#notice-length');
      I.fillField('input[id=notice-length]', '1');
      I.click(commonConfig.saveAndContinue);
    }
  } else if (noticePeriodContract === 'No written contract with notice period') {
    I.checkOption('input[id=notice-period-2]');
    I.click(commonConfig.saveAndContinue);
  }
  I.seeElement('#avg-weekly-hrs');
  I.fillField('#avg-weekly-hrs', '20');
  I.click(commonConfig.saveAndContinue);

  I.seeElement('#pay-before-tax');
  I.fillField('#pay-before-tax', '40000');
  I.fillField('#pay-after-tax', '35000');
  I.checkOption('input[id=pay-interval]');
  I.click(commonConfig.saveAndContinue);

  I.seeElement('#pension');
  I.checkOption('input[id=pension]');
  I.fillField('#pension-contributions', '200');
  I.click(commonConfig.saveAndContinue);

  I.seeElement('#employee-benefits');
  I.see('Do or did you receive any employee benefits?');
  I.checkOption('input[id=employee-benefits]');
  I.click(commonConfig.saveAndContinue);
};
