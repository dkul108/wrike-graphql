import { FieldConfig } from 'app/schema/definitions';
import { TimelogTC } from '../entities/TimelogTC';
import { timelogFindByIds, FindByIdsArgs } from 'app/vendor/timelog/timelogFindByIds';
import { TimelogID } from '../types/Scalars';

export default {
  type: TimelogTC.NonNull.List,
  args: {
    ids: TimelogID.NonNull.List.NonNull,
    plainText: 'Boolean',
  },
  resolve: (_, args, context) => {
    return timelogFindByIds(args, context);
  },
  extensions: {
    complexity: ({ args, childComplexity }) => childComplexity * (args.ids.length || 100),
  },
} as FieldConfig<FindByIdsArgs>;
