import { client } from './client';

export const logIn = (params) => {
  return client.post('/sessions', params);
};
