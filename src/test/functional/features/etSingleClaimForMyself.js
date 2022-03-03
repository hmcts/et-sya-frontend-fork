Feature('ET Single claim for my self');
const commonFlow = require('./commonFlow.js');
const { I } = inject();
const waitSeconds = 2;

Scenario('Verify ET single claim for myself when there is no acas certificate', async () => {
  commonPages();

  I.waitForText("Are you making a claim against more than 1 'respondent'?", waitSeconds);
  I.see('Yes - I’m making a claim against more than 1 respondent');
  I.checkOption('input[id=more_than_one_respondent]');
  I.click('Continue');

  I.waitForText(
    "Do you have an ‘Acas early conciliation certificate’ for each respondent you're making a claim against?",
    waitSeconds
  );
  I.click('How can ‘early conciliation’ help?', 'span[class=govuk-details__summary-text]');
  I.see('Making a claim can be time-consuming and difficult for everyone involved.');
  I.see('No');
  I.checkOption('input[id=acas-multiple-2]');
  I.click('Continue');

  I.waitForText(
    'Do you have a valid reason why you do not have an ‘Acas early conciliation certificate’?',
    waitSeconds
  );
  I.see('No');
  I.checkOption('input[id=valid-no-acas-reason-2]');
  I.click('Continue');

  I.waitForText('You need to contact Acas', waitSeconds);
  I.click('Contact Acas');
});

Scenario('Verify ET single claim myself when claim against more than one respondent', async () => {
  commonPages();

  I.waitForText("Are you making a claim against more than 1 'respondent'?", waitSeconds);
  I.see('Yes - I’m making a claim against more than 1 respondent');
  I.checkOption('input[id=more_than_one_respondent]');
  I.click('Continue');

  I.waitForText(
    "Do you have an ‘Acas early conciliation certificate’ for each respondent you're making a claim against?",
    waitSeconds
  );
  I.click('How can ‘early conciliation’ help?', 'span[class=govuk-details__summary-text]');
  I.see('Making a claim can be time-consuming and difficult for everyone involved.');
  I.see('No');
  I.checkOption('input[id=acas-multiple-2]');
  I.click('Continue');

  I.waitForText(
    'Do you have a valid reason why you do not have an ‘Acas early conciliation certificate’?',
    waitSeconds
  );
  I.see('Yes');
  I.checkOption('input[id=valid-no-acas-reason]');
  I.click('Continue');

  I.waitForText('What type of claim do you want to make?', waitSeconds);
  I.checkOption('input[id=typeOfClaim]');
  I.click('Continue');
});

Scenario('Verify ET single claim myself when claim against single respondent', async () => {
  commonPages();

  I.waitForText("Are you making a claim against more than 1 'respondent'?", waitSeconds);
  I.see('No - I’m making a claim against 1 single respondent');
  I.checkOption('input[id=more_than_one_respondent-2]');
  I.click('Continue');

  I.waitForText("Do you have an 'Acas early conciliation certificate'?", waitSeconds);
  I.see('Yes');
  I.checkOption('input[id=acas-single]');
  I.click('Continue');

  I.waitForText('What type of claim do you want to make?', waitSeconds);
  I.checkOption('input[id=typeOfClaim]');
  I.click('Continue');
});

function commonPages() {
  commonFlow.initialPageFlow();

  I.waitForText('I’m representing myself and making my own claim', waitSeconds);
  I.click('Who can act as a representative?', 'span[class=govuk-details__summary-text]');
  I.see('employment advisors – including those from Citizens Advice');
  I.checkOption('input[id=lip-or-representative]');
  I.click('Continue');

  I.waitForText(
    'Are you making a ‘single’ claim on your own or a ‘multiple’ claim alongside other people?',
    waitSeconds
  );
  I.checkOption('input[id=single-or-multiple-claim]');
  I.click('Continue');
}
