import { client } from './client';

export const fetchLendingsAndReservations = (params) => {
  return client.get(`/reservations/${params}/fetch_lendings_and_reservations`);
};
