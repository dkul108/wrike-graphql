import client from '../client';
import { AxiosRequestConfig } from 'axios';

export interface RemoveArgs {
  id: string;
}

// https://developers.wrike.com/api/v4/tasks/#delete-tasks
export async function taskRemove(opts: RemoveArgs, config: AxiosRequestConfig) {
  const { id } = opts || {};
  if (!id) throw new Error('You should provide `id`');
  const res = await client.delete(`/tasks/${id}`, config);
  return res?.data?.data[0];
}
