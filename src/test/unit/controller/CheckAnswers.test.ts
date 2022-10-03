import CheckYourAnswersController from '../../../main/controllers/CheckYourAnswersController';
import { mockRequestWithTranslation } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Check Your answers Controller', () => {
  const t = {
    'check-your-answers': {},
    common: {},
  };

  it('should render the Check your answers page', () => {
    const controller = new CheckYourAnswersController();
    const response = mockResponse();
    const request = mockRequestWithTranslation({ t });
    controller.get(request, response);
    expect(response.render).toHaveBeenCalledWith('check-your-answers', expect.anything());
  });
});
