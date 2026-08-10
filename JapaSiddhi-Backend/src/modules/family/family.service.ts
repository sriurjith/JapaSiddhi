import {
  CreateFamilyRequest,
  SearchFamilyMemberRequest,
  SendFamilyInvitationRequest,
} from './family.types';

import familyRepository from './family.repository';

import notificationService from '../notification/notification.service';



class FamilyService {


  async createFamily(
    userId: number,
    data: CreateFamilyRequest,
  ) {


    const id =
      await familyRepository.createFamily({

        userId,

        familyName:
          data.familyName,

        description:
          data.description ?? null,

      });


    return {

      id,

    };

  }



  async searchMember(
    data: SearchFamilyMemberRequest,
  ) {


    const user =
      await familyRepository.searchUserByMobile(
        data.mobileNumber,
      );


    if (!user) {

      return {

        exists: false,

        mobileNumber:
          data.mobileNumber,

      };

    }


    return {

      exists: true,

      user,

    };

  }



  async sendInvitation(
    userId: number,
    data: SendFamilyInvitationRequest,
  ) {


    const user =
      await familyRepository.searchUserByMobile(
        data.mobileNumber,
      );


    const inviteCode =
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();



    const invitationId =
      await familyRepository.createInvitation({

        familyId:
          data.familyId,

        invitedByUserId:
          userId,

        invitedUserId:
          user?.id ?? null,

        mobileNumber:
          data.mobileNumber,

        sentVia:
          user
            ? 'APP'
            : 'SMS',

        inviteCode,

      });



    if (user) {


      await notificationService.create({

        userId:
          user.id,

        title:
          'Family Japa Invitation',

        message:
          'You have received a Family Japa invitation',

        notificationType:
          'FAMILY_INVITATION',

        actionType:
          'FAMILY_INVITATION',

        actionId:
          invitationId,

        extraData: {

          inviterUserId:
            userId,

          mobileNumber:
            data.mobileNumber,

        },

      });


    }



    return {

      invitationId,

      sentVia:
        user
          ? 'APP'
          : 'SMS',

      inviteCode,

    };

  }



  async acceptInvitation(
    invitationId: number,
    userId: number,
  ) {


    const invitation =
      await familyRepository.getInvitation(
        invitationId,
      );


    if (!invitation) {

      throw new Error(
        'Invitation not found',
      );

    }



    await familyRepository.acceptInvitation(
      invitationId,
    );



    await familyRepository.addMember({

      familyId:
        invitation.family_id,

      userId,

      memberName:
        'Family Member',

      relation:
        'Member',

      mobileNumber:
        null,

      email:
        null,

    });



    return {

      success: true,

    };

  }



  async getFamily(
    userId: number,
  ) {


    const family =
      await familyRepository.getFamily(
        userId,
      );


    if (!family) {

      return null;

    }


    const members =
      await familyRepository.getMembers(
        family.id,
      );


    const todayCount =
      await familyRepository.getFamilyTodayCount(
        family.id,
      );



    return {

      ...family,

      members,

      todayJapaCount:
        todayCount,

      totalJapaCount:
        members.reduce(
          (
            total,
            member,
          ) =>
            total +
            Number(
              member.totalJapaCount,
            ),
          0,
        ),

    };

  }


}


export default new FamilyService();