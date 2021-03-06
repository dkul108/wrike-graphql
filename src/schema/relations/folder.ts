import { FolderTC } from 'app/schema/entities/FolderTC';
import { folderFindByIds } from 'app/vendor/folder/folderFindByIds';
import { resolveManyViaDL, resolveOneViaDL } from 'app/schema/dataLoaders';
import { ObjectTypeComposerFieldConfigDefinition } from 'graphql-compose';
import { folderFindMany } from 'app/vendor/folder/folderFindMany';
import { KeyValueInput } from 'app/schema/types/inputs/KeyValueInput';
import { CustomFieldFilterInput } from 'app/schema/types/inputs/CustomFieldFilterInput';
import { DateTimeRangeInput } from 'app/schema/types/inputs/DateTimeRangeInput';

export function getRelationFolderIds(
  sourceFieldName: string
): ObjectTypeComposerFieldConfigDefinition<any, any> {
  return {
    type: () => FolderTC.NonNull.List,
    resolve: process.env.DISABLE_DATALOADERS
      ? (source, _, context, info) =>
          folderFindByIds({ ids: source[sourceFieldName], info }, context)
      : resolveManyViaDL('FolderID', (s) => s[sourceFieldName]),
    projection: { [sourceFieldName]: 1 },
    extensions: {
      complexity: ({ childComplexity }) => childComplexity * 10,
    },
  };
}

export function getRelationFolderId(
  sourceFieldName: string
): ObjectTypeComposerFieldConfigDefinition<any, any> {
  return {
    type: () => FolderTC,
    resolve: process.env.DISABLE_DATALOADERS
      ? async (source, _, context, info) => {
          const records = await folderFindByIds({ ids: source[sourceFieldName], info }, context);
          return records?.[0];
        }
      : resolveOneViaDL('FolderID', (s) => s[sourceFieldName]),
    projection: { [sourceFieldName]: 1 },
  };
}

const FolderFilterByRelationSpaceId = FolderTC.schemaComposer.createInputTC({
  name: 'FolderFilterByRelationSpaceId',
  fields: {
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
      description: 'Updated date filter, range',
    },
    project: {
      type: 'Boolean',
      description: 'Get only projects (true) / only folders (false)',
    },
    deleted: {
      type: 'Boolean',
      description: 'Get folders from Root (false) / Recycle Bin (true)',
    },
  },
});

export function getRelationFoldersBySpaceId(
  sourceFieldName: string
): ObjectTypeComposerFieldConfigDefinition<any, any> {
  return {
    type: () => FolderTC.NonNull.List,
    args: {
      filter: FolderFilterByRelationSpaceId,
    },
    resolve: (source, args, context, info) => {
      return folderFindMany(
        {
          filter: {
            spaceId: source[sourceFieldName],
            ...args.filter,
          },
          info,
        },
        context
      );
    },
    projection: { [sourceFieldName]: 1 },
    extensions: {
      complexity: ({ childComplexity }) => childComplexity * 10,
    },
  };
}
