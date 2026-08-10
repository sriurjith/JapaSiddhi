export interface CreateFamilyRequest {

  familyName: string;

  description?: string | null;

}



export interface SearchFamilyMemberRequest {

  mobileNumber: string;

}



export interface SendFamilyInvitationRequest {

  familyId: number;

  mobileNumber: string;

}



export interface FamilyInvitationResponse {

  id: number;

  familyId: number;

  familyName: string;

  invitedByUserId: number;

  inviterName: string;

  inviterMobileNumber: string;

  invitedUserId: number | null;

  invitedMobileNumber: string;

  sentVia:
    | 'APP'
    | 'SMS';

  status:
    | 'PENDING'
    | 'ACCEPTED'
    | 'REJECTED';

  createdAt: Date;

}



export interface AcceptFamilyInvitationRequest {

  invitationId: number;

}



export interface FamilyResponse {

  id: number;

  userId: number;

  familyName: string;

  description: string | null;

  totalMembers: number;

  totalJapaCount: number;

  createdAt: Date;

}



export interface FamilyMemberResponse {

  id: number;

  familyId: number;

  userId: number | null;

  memberName: string;

  relation: string;

  mobileNumber: string | null;

  email: string | null;

  profileImage: string | null;

  todayJapaCount: number;

  totalJapaCount: number;

}



export interface FamilyProgressResponse {

  familyId: number;

  familyName: string;

  totalJapaCount: number;

  todayJapaCount: number;

  members: FamilyMemberResponse[];

}



export interface FamilyLeaderboard {

  userId: number | null;

  memberName: string;

  totalJapaCount: number;

  rank: number;

}