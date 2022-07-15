import { client } from './client';

export const createLending = (params) => {
  return client.post("/lendings",params);
};

export const fetchLendings = (params) => {
  return client.get(`/lendings/${params}`);
};

export const fetchLending = (params) => {
  return client.get(`/lendings/${params}/fetch_lending`);
};

export const returnBook = (lendingId,currentUserId) => {
  return client.patch(`/lendings/${lendingId}/return`, { userId: currentUserId});
};
