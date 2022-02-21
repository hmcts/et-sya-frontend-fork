import { mock } from 'sinon';

import { isFieldFilledIn } from '../../../main/components/form/validator';
import UpdatePreferenceController from '../../../main/controllers/update_preference/UpdatePreferenceController';
import { AppRequest } from '../../../main/definitions/appRequest';
import { FormContent } from '../../../main/definitions/form';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Update Preference Controller', () => {
  const t = {
    'update-preference': {},
    common: {},
  };

  const mockFormContent = {
    fields: {
      updatePreference: {
        classes: 'govuk-radios',
        id: 'update-preference',
        type: 'radios',
        values: [
          {
            name: 'radio1',
            label: 'radio1',
            value: '',
            attributes: { maxLength: 2 },
          },
          {
            name: 'radio1',
            label: 'radio2',
            value: '',
            attributes: { maxLength: 2 },
          },
        ],
        validator: isFieldFilledIn,
      },
    },
  } as unknown as FormContent;

  it('should render the Update Preference page', () => {
    const controller = new UpdatePreferenceController(mockFormContent);

    const response = mockResponse();
    const request = <AppRequest>mockRequest({ t });

    const responseMock = mock(response);

    responseMock.expects('render').once().withArgs('update-preference');

    controller.get(request, response);
    responseMock.verify();
  });

  it('should redirect to the same screen when errors are present', () => {
    const errors = [{ propertyName: 'updatePreference', errorType: 'required' }];
    const body = { 'update-preference': '' };

    const controller = new UpdatePreferenceController(mockFormContent);

    const req = mockRequest({ body });
    const res = mockResponse();
    controller.post(req, res);

    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });
});
