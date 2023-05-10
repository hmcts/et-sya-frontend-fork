import os from 'os';

import { infoRequestHandler } from '@hmcts/info-provider';
import { Application } from 'express';
import { FileFilterCallback } from 'multer';

import AcasCertNumController from '../../controllers/AcasCertNumController';
import AcasMultipleController from '../../controllers/AcasMultipleController';
import AccessibilityStatementController from '../../controllers/AccessibilityStatementController';
import AddressDetailsController from '../../controllers/AddressDetailsController';
import AddressLookupController from '../../controllers/AddressLookupController';
import AddressPostCodeEnterController from '../../controllers/AddressPostCodeEnterController';
import AddressPostCodeSelectController from '../../controllers/AddressPostCodeSelectController';
import AverageWeeklyHoursController from '../../controllers/AverageWeeklyHoursController';
import BenefitsController from '../../controllers/BenefitsController';
import CaseDocumentController from '../../controllers/CaseDocumentController';
import ChangeDetailsController from '../../controllers/ChangeDetailsController';
import CheckYourAnswersController from '../../controllers/CheckYourAnswersController';
import ChecklistController from '../../controllers/ChecklistController';
import CitizenHubController from '../../controllers/CitizenHubController';
import CitizenHubDocumentController from '../../controllers/CitizenHubDocumentController';
import ClaimDetailsCheckController from '../../controllers/ClaimDetailsCheckController';
import ClaimDetailsController from '../../controllers/ClaimDetailsController';
import ClaimSavedController from '../../controllers/ClaimSavedController';
import ClaimSubmittedController from '../../controllers/ClaimSubmittedController';
import ClaimTypeDiscriminationController from '../../controllers/ClaimTypeDiscriminationController';
import ClaimTypePayController from '../../controllers/ClaimTypePayController';
import ClaimantApplicationsController from '../../controllers/ClaimantApplicationsController';
import CompensationController from '../../controllers/CompensationController';
import ContactAcasController from '../../controllers/ContactAcasController';
import CookiePreferencesController from '../../controllers/CookiePreferencesController';
import DescribeWhatHappenedController from '../../controllers/DescribeWhatHappenedController';
import DobController from '../../controllers/DobController';
import DownloadClaimController from '../../controllers/DownloadClaimController';
import EmploymentAndRespondentCheckController from '../../controllers/EmploymentAndRespondentCheckController';
import EndDateController from '../../controllers/EndDateController';
import HomeController from '../../controllers/HomeController';
import JobTitleController from '../../controllers/JobTitleController';
import LipOrRepController from '../../controllers/LipOrRepController';
import NewAccountLandingController from '../../controllers/NewAccountLandingController';
import NewJobController from '../../controllers/NewJobController';
import NewJobPayController from '../../controllers/NewJobPayController';
import NewJobStartDateController from '../../controllers/NewJobStartDateController';
import NoAcasNumberController from '../../controllers/NoAcasNumberController';
import NoticeEndController from '../../controllers/NoticeEndController';
import NoticeLengthController from '../../controllers/NoticeLengthController';
import NoticePeriodController from '../../controllers/NoticePeriodController';
import NoticeTypeController from '../../controllers/NoticeTypeController';
import PastEmployerController from '../../controllers/PastEmployerController';
import PayController from '../../controllers/PayController';
import PcqController from '../../controllers/PcqController';
import PensionController from '../../controllers/PensionController';
import PersonalDetailsCheckController from '../../controllers/PersonalDetailsCheckController';
import PlaceOfWorkController from '../../controllers/PlaceOfWorkController';
import ReasonableAdjustmentsController from '../../controllers/ReasonableAdjustmentsController';
import RespondentAddressController from '../../controllers/RespondentAddressController';
import RespondentDetailsCheckController from '../../controllers/RespondentDetailsCheckController';
import RespondentNameController from '../../controllers/RespondentNameController';
import RespondentPostCodeEnterController from '../../controllers/RespondentPostCodeEnterController';
import RespondentPostCodeSelectController from '../../controllers/RespondentPostCodeSelectController';
import ReturnToExistingController from '../../controllers/ReturnToExistingController';
import SelectedApplicationController from '../../controllers/SelectedApplicationController';
import SessionTimeoutController from '../../controllers/SessionTimeoutController';
import SexAndTitleController from '../../controllers/SexAndTitleController';
import SingleOrMultipleController from '../../controllers/SingleOrMultipleController';
import StartDateController from '../../controllers/StartDateController';
import StepsToMakingYourClaimController from '../../controllers/StepsToMakingYourClaimController';
import StillWorkingController from '../../controllers/StillWorkingController';
import SubmitClaimController from '../../controllers/SubmitClaimController';
import TelNumberController from '../../controllers/TelNumberController';
import TellUsWhatYouWantController from '../../controllers/TellUsWhatYouWantController';
import TribunalRecommendationController from '../../controllers/TribunalRecommendationController';
import TypeOfClaimController from '../../controllers/TypeOfClaimController';
import UpdatePreferenceController from '../../controllers/UpdatePreferenceController';
import ValidNoAcasReasonController from '../../controllers/ValidNoAcasReasonController';
import VideoHearingsController from '../../controllers/VideoHearingsController';
import WhistleblowingClaimsController from '../../controllers/WhistleblowingClaimsController';
import WorkAddressController from '../../controllers/WorkAddressController';
import WorkPostCodeEnterController from '../../controllers/WorkPostCodeEnterController';
import WorkPostCodeSelectController from '../../controllers/WorkPostCodeSelectController';
import WorkPostcodeController from '../../controllers/WorkPostcodeController';
import { AppRequest } from '../../definitions/appRequest';
import { FILE_SIZE_LIMIT, InterceptPaths, PageUrls, Urls } from '../../definitions/constants';

const multer = require('multer');
const handleUploads = multer({
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter: (req: AppRequest, file: Express.Multer.File, callback: FileFilterCallback) => {
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > FILE_SIZE_LIMIT) {
      req.fileTooLarge = true;
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  },
});

export class Routes {
  public enableFor(app: Application): void {
    // Singleton controllers:
    const describeWhatHappenedController = new DescribeWhatHappenedController();

    app.get(Urls.PCQ, new PcqController().get);
    app.get(PageUrls.HOME, new HomeController().get);
    app.get(PageUrls.CHECKLIST, new ChecklistController().get);
    app.get(PageUrls.NEW_ACCOUNT_LANDING, new NewAccountLandingController().get);
    app.get(PageUrls.PERSONAL_DETAILS_CHECK, new PersonalDetailsCheckController().get);
    app.post(PageUrls.PERSONAL_DETAILS_CHECK, new PersonalDetailsCheckController().post);
    app.get(PageUrls.LIP_OR_REPRESENTATIVE, new LipOrRepController().get);
    app.post(PageUrls.LIP_OR_REPRESENTATIVE, new LipOrRepController().post);
    app.get(PageUrls.SINGLE_OR_MULTIPLE_CLAIM, new SingleOrMultipleController().get);
    app.post(PageUrls.SINGLE_OR_MULTIPLE_CLAIM, new SingleOrMultipleController().post);
    app.get(PageUrls.ACAS_MULTIPLE_CLAIM, new AcasMultipleController().get);
    app.post(PageUrls.ACAS_MULTIPLE_CLAIM, new AcasMultipleController().post);
    app.get(PageUrls.VALID_ACAS_REASON, new ValidNoAcasReasonController().get);
    app.post(PageUrls.VALID_ACAS_REASON, new ValidNoAcasReasonController().post);
    app.get(PageUrls.COOKIE_PREFERENCES, new CookiePreferencesController().get);
    app.get(PageUrls.ACCESSIBILITY_STATEMENT, new AccessibilityStatementController().get);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_NAME, new RespondentNameController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_NAME, new RespondentNameController().post);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_ADDRESS, new RespondentAddressController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_ADDRESS, new RespondentAddressController().post);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.WORK_ADDRESS, new WorkAddressController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.WORK_ADDRESS, new WorkAddressController().post);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.PLACE_OF_WORK, new PlaceOfWorkController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.PLACE_OF_WORK, new PlaceOfWorkController().post);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.ACAS_CERT_NUM, new AcasCertNumController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.ACAS_CERT_NUM, new AcasCertNumController().post);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.NO_ACAS_NUMBER, new NoAcasNumberController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.NO_ACAS_NUMBER, new NoAcasNumberController().post);
    app.get(PageUrls.RESPONDENT_DETAILS_CHECK, new RespondentDetailsCheckController().get);
    app.post(PageUrls.RESPONDENT_DETAILS_CHECK, new RespondentDetailsCheckController().post);
    app.get(PageUrls.EMPLOYMENT_RESPONDENT_TASK_CHECK, new EmploymentAndRespondentCheckController().get);
    app.post(PageUrls.EMPLOYMENT_RESPONDENT_TASK_CHECK, new EmploymentAndRespondentCheckController().post);
    app.get(PageUrls.CONTACT_ACAS, new ContactAcasController().get);
    app.get(PageUrls.DOB_DETAILS, new DobController().get);
    app.post(PageUrls.DOB_DETAILS, new DobController().post);
    app.get(PageUrls.SEX_AND_TITLE, new SexAndTitleController().get);
    app.post(PageUrls.SEX_AND_TITLE, new SexAndTitleController().post);
    app.get(PageUrls.ADDRESS_DETAILS, new AddressDetailsController().get);
    app.post(PageUrls.ADDRESS_DETAILS, new AddressDetailsController().post);
    app.get(PageUrls.TELEPHONE_NUMBER, new TelNumberController().get);
    app.post(PageUrls.TELEPHONE_NUMBER, new TelNumberController().post);
    app.get(PageUrls.VIDEO_HEARINGS, new VideoHearingsController().get);
    app.post(PageUrls.VIDEO_HEARINGS, new VideoHearingsController().post);
    app.get(PageUrls.CLAIM_STEPS, new StepsToMakingYourClaimController().get);
    app.get(PageUrls.CLAIM_SAVED, new ClaimSavedController().get);
    app.get(PageUrls.RETURN_TO_EXISTING, new ReturnToExistingController().get);
    app.post(PageUrls.RETURN_TO_EXISTING, new ReturnToExistingController().post);
    app.get(PageUrls.UPDATE_PREFERENCES, new UpdatePreferenceController().get);
    app.post(PageUrls.UPDATE_PREFERENCES, new UpdatePreferenceController().post);
    app.get(PageUrls.JOB_TITLE, new JobTitleController().get);
    app.post(PageUrls.JOB_TITLE, new JobTitleController().post);
    app.get(PageUrls.STILL_WORKING, new StillWorkingController().get);
    app.post(PageUrls.STILL_WORKING, new StillWorkingController().post);
    app.get(PageUrls.TYPE_OF_CLAIM, new TypeOfClaimController().get);
    app.post(PageUrls.TYPE_OF_CLAIM, new TypeOfClaimController().post);
    app.get(PageUrls.PAST_EMPLOYER, new PastEmployerController().get);
    app.post(PageUrls.PAST_EMPLOYER, new PastEmployerController().post);
    app.post(PageUrls.ADDRESS_LOOK_UP, new AddressLookupController().post);
    app.get(PageUrls.NOTICE_PERIOD, new NoticePeriodController().get);
    app.post(PageUrls.NOTICE_PERIOD, new NoticePeriodController().post);
    app.get(PageUrls.NOTICE_TYPE, new NoticeTypeController().get);
    app.post(PageUrls.NOTICE_TYPE, new NoticeTypeController().post);
    app.get(PageUrls.NOTICE_LENGTH, new NoticeLengthController().get);
    app.post(PageUrls.NOTICE_LENGTH, new NoticeLengthController().post);
    app.get(PageUrls.PENSION, new PensionController().get);
    app.post(PageUrls.PENSION, new PensionController().post);
    app.get(PageUrls.START_DATE, new StartDateController().get);
    app.post(PageUrls.START_DATE, new StartDateController().post);
    app.get(PageUrls.NOTICE_END, new NoticeEndController().get);
    app.post(PageUrls.NOTICE_END, new NoticeEndController().post);
    app.get(PageUrls.AVERAGE_WEEKLY_HOURS, new AverageWeeklyHoursController().get);
    app.post(PageUrls.AVERAGE_WEEKLY_HOURS, new AverageWeeklyHoursController().post);
    app.get(PageUrls.PAY, new PayController().get);
    app.post(PageUrls.PAY, new PayController().post);
    app.get(PageUrls.BENEFITS, new BenefitsController().get);
    app.post(PageUrls.BENEFITS, new BenefitsController().post);
    app.get(PageUrls.REASONABLE_ADJUSTMENTS, new ReasonableAdjustmentsController().get);
    app.post(PageUrls.REASONABLE_ADJUSTMENTS, new ReasonableAdjustmentsController().post);
    app.get(PageUrls.NEW_JOB, new NewJobController().get);
    app.post(PageUrls.NEW_JOB, new NewJobController().post);
    app.get(PageUrls.NEW_JOB_PAY, new NewJobPayController().get);
    app.post(PageUrls.NEW_JOB_PAY, new NewJobPayController().post);
    app.get(PageUrls.NEW_JOB_START_DATE, new NewJobStartDateController().get);
    app.post(PageUrls.NEW_JOB_START_DATE, new NewJobStartDateController().post);
    app.get(PageUrls.CLAIM_SUBMITTED, new ClaimSubmittedController().get);
    app.get(PageUrls.CHECK_ANSWERS, new CheckYourAnswersController().get);
    app.get(PageUrls.END_DATE, new EndDateController().get);
    app.post(PageUrls.END_DATE, new EndDateController().post);
    app.get(PageUrls.CLAIM_TYPE_DISCRIMINATION, new ClaimTypeDiscriminationController().get);
    app.post(PageUrls.CLAIM_TYPE_DISCRIMINATION, new ClaimTypeDiscriminationController().post);
    app.get(PageUrls.CLAIM_TYPE_PAY, new ClaimTypePayController().get);
    app.post(PageUrls.CLAIM_TYPE_PAY, new ClaimTypePayController().post);
    app.get(PageUrls.DESCRIBE_WHAT_HAPPENED, describeWhatHappenedController.get);
    app.post(
      PageUrls.DESCRIBE_WHAT_HAPPENED,
      handleUploads.single('claimSummaryFileName'),
      describeWhatHappenedController.post
    );
    app.get(PageUrls.TELL_US_WHAT_YOU_WANT, new TellUsWhatYouWantController().get);
    app.post(PageUrls.TELL_US_WHAT_YOU_WANT, new TellUsWhatYouWantController().post);
    app.get(PageUrls.COMPENSATION, new CompensationController().get);
    app.post(PageUrls.COMPENSATION, new CompensationController().post);
    app.get(PageUrls.TRIBUNAL_RECOMMENDATION, new TribunalRecommendationController().get);
    app.post(PageUrls.TRIBUNAL_RECOMMENDATION, new TribunalRecommendationController().post);
    app.get(PageUrls.WHISTLEBLOWING_CLAIMS, new WhistleblowingClaimsController().get);
    app.post(PageUrls.WHISTLEBLOWING_CLAIMS, new WhistleblowingClaimsController().post);
    app.get(PageUrls.CLAIM_DETAILS_CHECK, new ClaimDetailsCheckController().get);
    app.post(PageUrls.CLAIM_DETAILS_CHECK, new ClaimDetailsCheckController().post);
    app.get(Urls.DOWNLOAD_CLAIM, new DownloadClaimController().get);
    app.get(PageUrls.WORK_POSTCODE, new WorkPostcodeController().get);
    app.post(PageUrls.WORK_POSTCODE, new WorkPostcodeController().post);
    app.get(InterceptPaths.CHANGE_DETAILS, new ChangeDetailsController().get);
    app.get(Urls.EXTEND_SESSION, new SessionTimeoutController().getExtendSession);
    app.get(InterceptPaths.SUBMIT_CASE, new SubmitClaimController().get);
    app.get(PageUrls.CLAIMANT_APPLICATIONS, new ClaimantApplicationsController().get);
    app.get(PageUrls.SELECTED_APPLICATION, new SelectedApplicationController().get);
    app.get(PageUrls.CITIZEN_HUB, new CitizenHubController().get);
    app.get(PageUrls.CLAIM_DETAILS, new ClaimDetailsController().get);
    app.get(PageUrls.CITIZEN_HUB_DOCUMENT, new CitizenHubDocumentController().get);
    app.get(PageUrls.GET_CASE_DOCUMENT, new CaseDocumentController().get);
    app.get(PageUrls.ADDRESS_POSTCODE_SELECT, new AddressPostCodeSelectController().get);
    app.post(PageUrls.ADDRESS_POSTCODE_SELECT, new AddressPostCodeSelectController().post);
    app.get(PageUrls.ADDRESS_POSTCODE_ENTER, new AddressPostCodeEnterController().get);
    app.post(PageUrls.ADDRESS_POSTCODE_ENTER, new AddressPostCodeEnterController().post);
    app.get(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.ADDRESS_POSTCODE_ENTER,
      new AddressPostCodeEnterController().get
    );
    app.post(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.ADDRESS_POSTCODE_ENTER,
      new AddressPostCodeEnterController().post
    );
    app.get(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.ADDRESS_POSTCODE_SELECT,
      new AddressPostCodeSelectController().get
    );
    app.post(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.ADDRESS_POSTCODE_SELECT,
      new AddressPostCodeSelectController().post
    );

    app.get(PageUrls.RESPONDENT_POSTCODE_SELECT, new RespondentPostCodeSelectController().get);
    app.post(PageUrls.RESPONDENT_POSTCODE_SELECT, new RespondentPostCodeSelectController().post);
    app.get(PageUrls.RESPONDENT_POSTCODE_ENTER, new RespondentPostCodeEnterController().get);
    app.post(PageUrls.RESPONDENT_POSTCODE_ENTER, new RespondentPostCodeEnterController().post);
    app.get(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_POSTCODE_ENTER,
      new RespondentPostCodeEnterController().get
    );
    app.post(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_POSTCODE_ENTER,
      new RespondentPostCodeEnterController().post
    );
    app.get(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_POSTCODE_SELECT,
      new RespondentPostCodeSelectController().get
    );
    app.post(
      PageUrls.RESPONDENT_REST_PREFIX + PageUrls.RESPONDENT_POSTCODE_SELECT,
      new RespondentPostCodeSelectController().post
    );

    app.get(PageUrls.WORK_POSTCODE_SELECT, new WorkPostCodeSelectController().get);
    app.post(PageUrls.WORK_POSTCODE_SELECT, new WorkPostCodeSelectController().post);
    app.get(PageUrls.WORK_POSTCODE_ENTER, new WorkPostCodeEnterController().get);
    app.post(PageUrls.WORK_POSTCODE_ENTER, new WorkPostCodeEnterController().post);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.WORK_POSTCODE_ENTER, new WorkPostCodeEnterController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.WORK_POSTCODE_ENTER, new WorkPostCodeEnterController().post);
    app.get(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.WORK_POSTCODE_SELECT, new WorkPostCodeSelectController().get);
    app.post(PageUrls.RESPONDENT_REST_PREFIX + PageUrls.WORK_POSTCODE_SELECT, new WorkPostCodeSelectController().post);
    app.get(
      Urls.INFO,
      infoRequestHandler({
        extraBuildInfo: {
          host: os.hostname(),
          name: 'et-sya-frontend',
          uptime: process.uptime(),
        },
        info: {},
      })
    );
  }
}
