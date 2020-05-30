import DataLoader from 'dataloader';
import { approvalFindByIds } from 'app/vendor/approval/approvalFindByIds';

export function approvalDLG() {
  return new DataLoader<string, any>(async (ids) => {
    const results = await approvalFindByIds({ ids });
    return ids.map(
      (id) => results.find((x) => x.id === id) || new Error(`Approval: no result for ${id}`)
    );
  });
}
