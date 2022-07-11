import { client } from './client';

export const createLending = (params) => {
  return client.post("/lendings",params);
};

export const fetchLendings = (params) => {
  return client.get(`/lendings/${params}`);
};

export const fetchLendingUser = (params) => {
  return client.get(`/lendings/${params}/fetch_lending_user`);
};
