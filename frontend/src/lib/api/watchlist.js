import { client } from './client';

export const fetchWatchingBooks = (current_user_id, flag) => {
  return client.get("/watch_lists",{params:{id:current_user_id, flag: flag}});
};

export const addWatchList = (params) => {
  return client.post("/watch_lists",params);
};

export const removeWatchList = (watchListId) => {
  return client.delete(`/watch_lists/${watchListId}`);
};

export const fetchIsWatching = (user_id,book_id) => {
  return client.get("/watch_lists/is_watching",{params:{id: user_id, book_id: book_id}});
};
