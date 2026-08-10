import {
  CreateNotificationRequest,
} from './notification.types';

import notificationRepository from './notification.repository';



class NotificationService {


  async create(
    data: CreateNotificationRequest,
  ) {


    const id =
      await notificationRepository.create(
        {
          userId:
            data.userId,

          title:
            data.title,

          message:
            data.message,

          notificationType:
            data.notificationType,

          actionType:
            data.actionType ?? null,

          actionId:
            data.actionId ?? null,

          extraData:
            data.extraData ?? null,
        },
      );


    return {

      id,

    };

  }



  async getUserNotifications(
    userId: number,
  ) {


    return notificationRepository.getUserNotifications(
      userId,
    );

  }



  async markAsRead(
    id: number,
    userId: number,
  ) {


    await notificationRepository.markAsRead(
      id,
      userId,
    );


    return {

      success: true,

    };

  }



  async getUnreadCount(
    userId: number,
  ) {


    const unreadCount =
      await notificationRepository.getUnreadCount(
        userId,
      );


    return {

      unreadCount,

    };

  }


}


export default new NotificationService();