import { composeWithJson } from 'graphql-compose-json';
import { GroupID, ContactID, AccountID } from 'app/schema/types/Scalars';
import { KeyValue } from 'app/schema/types/outputs/KeyValue';
import { getRelationAccountId } from 'app/schema/relations/account';
import { getRelationContactIds } from 'app/schema/relations/contact';

const restApiResponse = {
  id: GroupID.NonNull,
  accountId: AccountID.NonNull,
  title: 'New test group',
  memberIds: ContactID.NonNull.List,
  childIds: ContactID.NonNull.List,
  parentIds: ContactID.NonNull.List,
  avatarUrl: '/98/14/Circle_ffe9c7a0_78-71_v1.png',
  myTeam: true,
  metadata: KeyValue.NonNull.List,
};

export const GroupTC = composeWithJson('Group', restApiResponse);

if (!process.env.DISABLE_RELATIONS) {
  GroupTC.addFields({
    account: () => getRelationAccountId('accountId'),
    members: () => getRelationContactIds('memberIds'),
    childs: () => getRelationContactIds('childIds'),
    parents: () => getRelationContactIds('parentIds'),
  });
}
