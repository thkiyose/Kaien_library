import { client } from './client';

export const createUser = (params) => {
  return client.post('/users', params);
};

export const getMyPageInfo = (user_id) => {
  return client.get(`/users/${user_id}`);
};
