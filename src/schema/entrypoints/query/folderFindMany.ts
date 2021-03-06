import { folderFindMany } from 'app/vendor/folder/folderFindMany';
import { FolderTC } from 'app/schema/entities/FolderTC';
import { FieldConfig } from 'app/schema/definitions';
import { KeyValueInput } from 'app/schema/types/inputs/KeyValueInput';
import { DateTimeRangeInput } from 'app/schema/types/inputs/DateTimeRangeInput';
import { ProjectContractTypeEnum } from 'app/schema/types/Enums';
import { CustomFieldFilterInput } from 'app/schema/types/inputs/CustomFieldFilterInput';

const FolderFilterInput = FolderTC.schemaComposer.createInputTC({
  name: 'FolderFindManyFilter',
  description:
    'Note: when any of query filter parameters are present (e.g. descendants=false, metadata) response is switched to Folder model.',
  fields: {
    permalink: {
      type: 'String',
      description: 'Folder permalink, exact match',
    },
    descendants: {
      type: 'Boolean',
      defaultValue: true,
      description: 'Adds all descendant folders to search scope',
    },
    metadata: {
      type: KeyValueInput,
      description: 'Folders metadata filter',
    },
    customField: {
      type: CustomFieldFilterInput,
      description: 'Custom field filter',
    },
    updatedDate: {
      type: DateTimeRangeInput,
      description: 'Updated date filter',
    },
    project: {
      type: 'Boolean',
      description: 'Get only projects (true) / only folders (false)',
    },
    deleted: {
      type: 'Boolean',
      description: 'Get folders from Root (false) / Recycle Bin (true)',
    },
    contractTypes: {
      type: ProjectContractTypeEnum,
      description: 'Contract type filter (Wrike Resource only)',
    },
  },
});

export default {
  type: FolderTC.NonNull.List,
  args: {
    filter: FolderFilterInput,
  },
  resolve: (_, { filter }, context, info) => {
    return folderFindMany({ filter, info }, context);
  },
  extensions: {
    complexity: ({ childComplexity }) => childComplexity * 100,
  },
} as FieldConfig;
