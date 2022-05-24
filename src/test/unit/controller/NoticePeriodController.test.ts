import NoticePeriodController from '../../../main/controllers/NoticePeriodController';
import { AppRequest } from '../../../main/definitions/appRequest';
import { YesOrNo } from '../../../main/definitions/case';
import { PageUrls, TranslationKeys } from '../../../main/definitions/constants';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Notice Period Controller', () => {
  const t = {
    'notice-period': {},
    common: {},
  };

  it('should render the notice period page', () => {
    const controller = new NoticePeriodController();
    const response = mockResponse();
    const request = <AppRequest>mockRequest({ t });

    controller.get(request, response);
    expect(response.render).toHaveBeenCalledWith(TranslationKeys.NOTICE_PERIOD, expect.anything());
  });

  it('should render the notice type page when yes radio button is selected', () => {
    const body = { noticePeriod: YesOrNo.YES };
    const controller = new NoticePeriodController();

    const req = mockRequest({ body });
    const res = mockResponse();
    controller.post(req, res);

    expect(res.redirect).toBeCalledWith(PageUrls.NOTICE_TYPE);
  });

  it('should render the average weekly hours page when no radio button is selected', () => {
    const body = { noticePeriod: YesOrNo.NO };
    const controller = new NoticePeriodController();

    const req = mockRequest({ body });
    const res = mockResponse();
    controller.post(req, res);

    expect(res.redirect).toBeCalledWith(PageUrls.AVERAGE_WEEKLY_HOURS);
  });
});
