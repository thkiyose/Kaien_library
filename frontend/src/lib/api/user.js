import { client } from './client';

export const getMyPageInfo = (user_id) => {
  return client.get(`/users/${user_id}`);
};
