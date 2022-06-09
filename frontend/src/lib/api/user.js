import { client } from './client';

export const createUser = (params) => {
  return client.post('/users', params);
};
