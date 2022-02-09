import { isFieldFilledIn } from '../../../main/components/form/validator';
import ValidNoAcasReasonController from '../../../main/controllers/valid_no_acas_reason/ValidNoAcasReasonController';
import { YesOrNo } from '../../../main/definitions/case';
import { FormContent } from '../../../main/definitions/form';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Valid no acas reason Controller', () => {
  const t = {
    'valid-no-acas-reason': {},
    common: {},
  };

  const mockFormContent = {
    fields: {
      validNoAcasReason: {
        type: 'radios',
        id: 'radio1',
        name: YesOrNo.YES,
        validator: jest.fn(isFieldFilledIn),
      },
    },
  } as unknown as FormContent;

  it('should render the Valid No Acas Reason controller page', () => {
    const acasSingleClaimController = new ValidNoAcasReasonController(mockFormContent);

    const response = mockResponse();
    const userCase = { validNoAcasReason: YesOrNo.YES };
    const request = mockRequest({ t, userCase });

    acasSingleClaimController.get(request, response);
    expect(response.render).toHaveBeenCalledWith('valid-no-acas-reason', expect.anything());
  });

  describe('post()', () => {
    it('should redirect back to Valid No Acas Reason page when errors are present', () => {
      const errors = [{ propertyName: 'validNoAcasReason', errorType: 'required' }];
      const body = { validNoAcasReason: '' };

      const controller = new ValidNoAcasReasonController(mockFormContent);

      const req = mockRequest({ body });
      const res = mockResponse();
      controller.post(req, res);

      expect(res.redirect).toBeCalledWith(req.path);
      expect(req.session.errors).toEqual(errors);
    });

    it('should assign userCase from formData for Valid No Acas Reason', () => {
      const body = { validNoAcasReason: YesOrNo.YES };

      const controller = new ValidNoAcasReasonController(mockFormContent);

      const req = mockRequest({ body });
      const res = mockResponse();
      req.session.userCase = undefined;

      controller.post(req, res);

      expect(res.redirect).toBeCalledWith('/type-of-claim');
      expect(req.session.userCase).toStrictEqual({
        validNoAcasReason: YesOrNo.YES,
      });
    });
  });
});
