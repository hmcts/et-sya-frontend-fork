import BenefitsController from '../../../main/controllers/BenefitsController';
import { StillWorking, YesOrNo } from '../../../main/definitions/case';
import { PageUrls, TranslationKeys } from '../../../main/definitions/constants';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Benefits Controller', () => {
  const t = {
    benefits: {},
    common: {},
  };

  it('should render benefits page', () => {
    const benefitsController = new BenefitsController();
    const response = mockResponse();
    const request = mockRequest({ t });

    benefitsController.get(request, response);
    expect(response.render).toHaveBeenCalledWith(TranslationKeys.BENEFITS, expect.anything());
  });

  it('should render the new job page when on no longer working route, yes radio button is selected and valid benefits text entered', () => {
    const body = { employeeBenefits: YesOrNo.YES, benefitsCharCount: 'Test benefits text' };
    const userCase = { isStillWorking: StillWorking.NO_LONGER_WORKING };
    const controller = new BenefitsController();

    const req = mockRequest({ body, userCase });
    const res = mockResponse();
    controller.post(req, res);

    expect(res.redirect).toBeCalledWith(PageUrls.NEW_JOB);
  });

  it('should render the home page when on working or notice route and no radio button is selected', () => {
    const body = { employeeBenefits: '' };
    const userCase = { isStillWorking: StillWorking.WORKING || StillWorking.NOTICE };
    const controller = new BenefitsController();

    const req = mockRequest({ body, userCase });
    const res = mockResponse();
    controller.post(req, res);

    expect(res.redirect).toBeCalledWith(PageUrls.HOME);
  });
});
