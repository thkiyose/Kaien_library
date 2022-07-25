import { client } from './client';

export const addWatchList = (params) => {
  return client.post("/watch_lists",params);
};

export const fetchIsWatching = (user_id,book_id) => {
  return client.get("/watch_lists/is_watching",{params:{id: user_id, book_id: book_id}});
};
