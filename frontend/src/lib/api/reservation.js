import { client } from './client';

export const createReservation = (params) => {
  return client.post("/reservations",params);
};

export const fetchLendingsAndReservations = (params) => {
  return client.get(`/reservations/${params}/fetch_lendings_and_reservations`);
};
