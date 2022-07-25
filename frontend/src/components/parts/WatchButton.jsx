import React, { useContext } from 'react';
import { Context } from '../../App';
import { addWatchList } from '../../lib/api/watchlist'

export const WatchButton = (props) => {
  const { currentUser } = useContext(Context);
  const bookId = props;

  const handleAddWatchList = async() => {
    const res = await addWatchList({Id:currentUser.id, bookId: bookId.bookId})
    console.log(res);
  }
  return (
    <button onClick={()=>{handleAddWatchList()}}>★</button>
  );
}
