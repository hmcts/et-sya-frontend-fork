import { SendNotificationTypeItem } from '../../definitions/complexTypes/sendNotificationTypeItem';
import { NotificationSubjects, PageUrls } from '../../definitions/constants';
import { HubLinkStatus, statusColorMap } from '../../definitions/hub';
import { AnyRecord } from '../../definitions/util-types';

import { createDownloadLink } from './DocumentHelpers';
import { getLanguageParam } from './RouterHelpers';

export const getCorrespondenceNotificationDetails = (
  translations: AnyRecord,
  item: SendNotificationTypeItem
): { key: unknown; value?: unknown; actions?: unknown }[] => {
  const generalCorrespondenceNotification = [];
  generalCorrespondenceNotification.push(
    {
      key: {
        text: translations.dateSent,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text: item.value.date,
      },
    },
    {
      key: {
        text: translations.sentBy,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text: translations.tribunal,
      },
    },
    {
      key: {
        text: translations.addInfo,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text: item.value.sendNotificationAdditionalInfo,
      },
    }
  );

  const docs = item.value.sendNotificationUploadDocument;
  if (docs?.length) {
    docs.forEach(doc => {
      generalCorrespondenceNotification.push(
        {
          key: {
            text: translations.description,
            classes: 'govuk-!-font-weight-regular-m',
          },
          value: { text: doc.value.shortDescription },
        },
        {
          key: {
            text: translations.document,
            classes: 'govuk-!-font-weight-regular-m',
          },
          value: { html: createDownloadLink(doc.value.uploadedDocument) },
        }
      );
    });
  }

  generalCorrespondenceNotification.push({
    key: {
      text: translations.sentTo,
      classes: 'govuk-!-font-weight-regular-m',
    },
    value: {
      text: item.value.sendNotificationNotify,
    },
  });

  return generalCorrespondenceNotification;
};

export const updateGeneralCorrespondenceRedirectLinksAndStatus = (
  notifications: SendNotificationTypeItem[],
  url: string,
  translations: AnyRecord
): void => {
  notifications.forEach(item => {
    if (item.value.sendNotificationSubject.includes(NotificationSubjects.GENERAL_CORRESPONDENCE)) {
      item.redirectUrl = PageUrls.GENERAL_CORRESPONDENCE_NOTIFICATION_DETAILS.replace(
        ':itemId',
        `${item.id}${getLanguageParam(url)}`
      );
      item.statusColor = statusColorMap.get(<HubLinkStatus>item.value.notificationState);
      item.displayStatus = translations[item.value.notificationState];
    }
  });
};
