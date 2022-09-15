import DescribeWhatHappenedController from '../../../main/controllers/DescribeWhatHappenedController';
import * as helper from '../../../main/controllers/helpers/CaseHelpers';
import { DocumentUploadResponse } from '../../../main/definitions/api/documentApiResponse';
import { PageUrls, TranslationKeys } from '../../../main/definitions/constants';
import { mockLogger } from '../mocks/mockLogger';
import { mockRequest } from '../mocks/mockRequest';
import { mockResponse } from '../mocks/mockResponse';

describe('Describe-What-Happened Controller', () => {
  const t = {
    'describe-what-happened': {},
    common: {},
  };

  const helperMock = jest.spyOn(helper, 'handleUploadDocument');

  beforeAll(() => {
    const uploadResponse: DocumentUploadResponse = {
      originalDocumentName: 'test.txt',
      uri: 'test.com',
      _links: {
        binary: {
          href: 'test.com',
        },
      },
    } as DocumentUploadResponse;

    (helperMock as jest.Mock).mockReturnValue({
      data: uploadResponse,
    });
  });

  it('should render describe what happened page', () => {
    const controller = new DescribeWhatHappenedController(mockLogger);
    const response = mockResponse();
    const request = mockRequest({ t });

    controller.get(request, response);
    expect(response.render).toHaveBeenCalledWith(TranslationKeys.DESCRIBE_WHAT_HAPPENED, expect.anything());
  });

  describe('Correct validation', () => {
    it('should require either summary text or summary file', () => {
      const req = mockRequest({ body: { claimSummaryText: '', claimSummaryFileName: '' } });
      new DescribeWhatHappenedController(mockLogger).post(req, mockResponse());

      expect(req.session.errors).toEqual([{ propertyName: 'claimSummaryText', errorType: 'required' }]);
    });

    it('should not allow both summary text and summary file', () => {
      const req = mockRequest({ body: { claimSummaryText: 'text', claimSummaryFileName: 'file.txt' } });
      new DescribeWhatHappenedController(mockLogger).post(req, mockResponse());

      expect(req.session.errors).toEqual([{ propertyName: 'claimSummaryText', errorType: 'textAndFile' }]);
    });

    it('should only allow valid file formats', () => {
      const req = mockRequest({ body: { claimSummaryFileName: 'file.invalidFileFormat' } });
      new DescribeWhatHappenedController(mockLogger).post(req, mockResponse());

      expect(req.session.errors).toEqual([{ propertyName: 'claimSummaryFileName', errorType: 'invalidFileFormat' }]);
    });

    it('should assign userCase from summary text', () => {
      const req = mockRequest({ body: { claimSummaryText: 'test' } });
      const res = mockResponse();

      new DescribeWhatHappenedController(mockLogger).post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PageUrls.TELL_US_WHAT_YOU_WANT);
      expect(req.session.userCase).toMatchObject({
        claimSummaryText: 'test',
      });
    });

    it('should assign userCase from summary file', () => {
      const req = mockRequest({ body: { claimSummaryFileName: 'testFile.txt' } });
      const res = mockResponse();

      new DescribeWhatHappenedController(mockLogger).post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PageUrls.TELL_US_WHAT_YOU_WANT);
      expect(req.session.userCase).toMatchObject({
        claimSummaryFileName: 'testFile.txt',
      });
    });
  });
});
