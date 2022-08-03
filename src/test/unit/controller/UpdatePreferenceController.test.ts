import { LoggerInstance } from 'winston';

import UpdatePreferenceController from '../../../main/controllers/UpdatePreferenceController';
import { AppRequest } from '../../../main/definitions/appRequest';
import { TranslationKeys } from '../../../main/definitions/constants';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Update Preference Controller', () => {
  const t = {
    'update-preference': {},
    common: {},
  };

  const mockLogger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

  it('should render the Update Preference page', () => {
    const controller = new UpdatePreferenceController(mockLogger);
    const response = mockResponse();
    const request = <AppRequest>mockRequest({ t });

    controller.get(request, response);
    expect(response.render).toHaveBeenCalledWith(TranslationKeys.UPDATE_PREFERENCE, expect.anything());
  });

  it('should redirect to the same screen when errors are present', () => {
    const errors = [{ propertyName: 'claimant_contact_preference', errorType: 'required' }];
    const body = { claimant_contact_preference: '' };

    const controller = new UpdatePreferenceController(mockLogger);

    const req = mockRequest({ body });
    const res = mockResponse();
    controller.post(req, res);

    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });

  it('should add the update preference form value to the userCase', () => {
    const body = { claimant_contact_preference: 'Email' };

    const controller = new UpdatePreferenceController(mockLogger);

    const req = mockRequest({ body });
    const res = mockResponse();
    req.session.userCase = undefined;

    controller.post(req, res);

    expect(req.session.userCase).toStrictEqual({ claimant_contact_preference: 'Email' });
  });
});
