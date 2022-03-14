import SummariseYourClaimController from '../../../main/controllers/summarise_your_claim/SummariseYourClaimController';
import { TranslationKeys } from '../../../main/definitions/constants';
import { FormContent } from '../../../main/definitions/form';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Summarise Your Claim Controller', () => {
  const t = {
    'summarise-your-claim': {},
    common: {},
  };

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('should render summarise your claim page', () => {
    const genderDetailsController = new SummariseYourClaimController(mockFormContent);
    const response = mockResponse();
    const request = mockRequest({ t });

    genderDetailsController.get(request, response);
    expect(response.render).toHaveBeenCalledWith(TranslationKeys.SUMMARISE_YOUR_CLAIM, expect.anything());
  });
});
