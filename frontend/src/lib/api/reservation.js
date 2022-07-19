import { client } from './client';

export const createReservation = (params) => {
  return client.post("/reservations",params);
};

export const fetchLendingsAndReservations = (params) => {
  return client.get(`/reservations/${params}/fetch_lendings_and_reservations`);
};

export const fetchCurrentUserReservation = (book_id,current_user_id) => {
  return client.get(`/reservations/${book_id}/fetch_current_user_reservation`, { params: {user_id: current_user_id} });
};

export const destroyReservation = (id) => {
  return client.delete(`/reservations/${id}`);
};
