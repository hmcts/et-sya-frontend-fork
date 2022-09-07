import PlaceOfWorkController from '../../../main/controllers/PlaceOfWorkController';
import { PageUrls } from '../../../main/definitions/constants';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Place Of Work Controller Tests', () => {
  const t = {
    'place-of-work': {},
    'enter-address': {},
    common: {},
  };

  it('should render place of work page', () => {
    const controller = new PlaceOfWorkController();
    const response = mockResponse();
    const request = mockRequest({ t });

    controller.get(request, response);

    expect(response.render).toHaveBeenCalledWith('place-of-work', expect.anything());
  });

  it('should redirect back to self if there are errors', () => {
    const errors = [{ propertyName: 'workAddress1', errorType: 'required' }];
    const body = {
      workAddress1: '',
      workAddress12: '',
      workAddressTown: 'Exeter',
      workAddressCountry: 'United Kingdom',
      workAddressPostcode: 'EX7 8KK',
    };
    const controller = new PlaceOfWorkController();

    const req = mockRequest({ body });
    const res = mockResponse();

    controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });

  it('should redirect to Acas number page if no errors', () => {
    const body = {
      workAddress1: '31 The Street',
      workAddress12: '',
      workAddressTown: 'Exeter',
      workAddressCountry: 'United Kingdom',
      workAddressPostcode: 'EX7 8KK',
    };
    const controller = new PlaceOfWorkController();

    const req = mockRequest({ body });
    const res = mockResponse();

    controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/respondent/1/acas-cert-num');
    expect(req.session.errors).toEqual([]);
  });
  it('should redirect to your claim has been saved page when save as draft selected and nothing is entered', () => {
    const body = { saveForLater: true };
    const controller = new PlaceOfWorkController();

    const req = mockRequest({ body });
    const res = mockResponse();

    controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(PageUrls.CLAIM_SAVED);
  });
});
