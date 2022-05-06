Feature('Check Your Answers Skeletal Pages');
const test_url = '/check-your-answers';
const { I } = inject();

Scenario('ET Check your answer: Submit Claim', () => {
  I.amOnPage(test_url);
  I.see('Check your answers');
  I.seeElement('#main-content');
  I.click('#main-form-submit');
  I.see('Your claim has been submitted');
})
  .tag('@RET-1178')
  .tag(' @RET-BAT');

Scenario('ET Check your answer: Save for later', () => {
  I.amOnPage(test_url);
  I.see('Check your answers');
  I.seeElement('#main-form-save-for-later');
  I.click('#main-form-save-for-later');
  I.see('Your claim has been saved');
  I.see('Continue with your claim');
  I.click('[href="/return-to-existing"]');
  I.see('Return to an existing claim');
}).tag('@RET-1178');
