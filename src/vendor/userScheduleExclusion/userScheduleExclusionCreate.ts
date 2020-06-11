import client from '../client';
import { AxiosRequestConfig } from 'axios';

export interface CreateArgs {
  exclusion: Record<string, any>;
}

// https://developers.wrike.com/api/v4/user-schedule-exceptions/#create-user-schedule-exception
export async function userScheduleExclusionCreate(opts: CreateArgs, config: AxiosRequestConfig) {
  const { exclusion } = opts || {};
  const res = await client.post(`/user_schedule_exclusions`, exclusion, config);
  return res?.data?.data[0];
}
