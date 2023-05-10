import RespondentPostCodeEnterController from '../../../main/controllers/RespondentPostCodeEnterController';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Respondent Postcode Enter Controller', () => {
  const t = {
    'respondent-postcode-enter': {},
    common: {},
  };

  it('should render the Respondent Enter Postcode page', () => {
    const response = mockResponse();
    const request = mockRequest({ t });

    new RespondentPostCodeEnterController().get(request, response);

    expect(response.render).toHaveBeenCalledWith('respondent-postcode-enter', expect.anything());
  });

  describe('post()', () => {
    it("should return a 'required' error when the postcode field is empty", () => {
      const body = {
        respondentEnterPostcode: '',
      };
      const errors = [{ propertyName: 'respondentEnterPostcode', errorType: 'required' }];

      const req = mockRequest({ body });
      const res = mockResponse();
      new RespondentPostCodeEnterController().post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(req.path);
      expect(req.session.errors).toEqual(errors);
    });

    it('should set the respondentEnterPostCode value in userCase', () => {
      const postCode = 'G44 5TY';
      const body = { respondentEnterPostcode: postCode };

      const req = mockRequest({ body });
      const res = mockResponse();
      new RespondentPostCodeEnterController().post(req, res);
      expect(req.session.userCase.respondentEnterPostcode).toEqual(postCode);
    });
  });
});
