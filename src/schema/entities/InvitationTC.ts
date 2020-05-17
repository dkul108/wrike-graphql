import { composeWithJson } from 'graphql-compose-json';
import { InvitationID, AccountID, ContactID } from 'app/schema/types/Scalars';
import { InvitationStatusEnum, UserRoleEnum } from '../types/Enums';

const restApiResponse = {
  id: () => InvitationID,
  accountId: () => AccountID,
  firstName: 'Wrike',
  lastName: 'Bot',
  email: 'robot3246automation@wrike-robot.com',
  status: () => InvitationStatusEnum,
  inviterUserId: () => ContactID,
  invitationDate: '2020-03-25T11:36:54Z',
  resolvedDate: '2020-03-25T11:36:54Z',
  role: () => UserRoleEnum,
  external: true,
};

export const InvitationTC = composeWithJson('Invitation', restApiResponse);