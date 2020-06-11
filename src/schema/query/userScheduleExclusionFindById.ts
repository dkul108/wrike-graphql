import { FieldConfig } from 'app/schema/definitions';
import { UserScheduleExclusionTC } from '../entities/UserScheduleExclusionTC';
import { UserScheduleExclusionID } from '../types/Scalars';
import {
  userScheduleExclusionFindById,
  FindByIdOpts,
} from 'app/vendor/userScheduleExclusion/userScheduleExclusionFindById';

export default {
  type: UserScheduleExclusionTC,
  args: {
    id: UserScheduleExclusionID.NonNull,
  },
  resolve: (_, args, context) => {
    return userScheduleExclusionFindById(args, context);
  },
} as FieldConfig<FindByIdOpts>;
