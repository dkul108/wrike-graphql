import client from '../client';
import { AxiosRequestConfig } from 'axios';

export interface RemoveArgs {
  id: string;
}

// https://developers.wrike.com/api/v4/folders-projects/#delete-folder
export async function folderRemove(opts: RemoveArgs, config: AxiosRequestConfig) {
  const { id } = opts || {};

  if (!id) throw new Error('You should provide `id`');

  const res = await client.delete(`/folders/${id}`, config);

  return res?.data?.data[0];
}
