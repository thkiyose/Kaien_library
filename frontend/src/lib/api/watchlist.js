import { client } from './client';

export const addWatchList = (params) => {
  return client.post("/watch_lists",params);
};
