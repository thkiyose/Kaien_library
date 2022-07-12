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

export const isCurrentUserLending = (params) => {
  return client.post("/lendings/is_current_user_lending",params);
};

export const returnBook = (params) => {
  return client.patch(`/lendings/${params}/return`);
};
