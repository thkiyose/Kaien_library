import React, { useState, useContext } from 'react';
import { Context } from '../../App';
import { addWatchList } from '../../lib/api/watchlist'

export const WatchButton = (props) => {
  const { currentUser } = useContext(Context);
  const [ isWatching, setIsWatching ] = useState(false);
  const bookId = props;

  const handleAddWatchList = async() => {
    const res = await addWatchList({Id:currentUser.id, bookId: bookId.bookId})
    if (res.data.status === "SUCCESS") {
      setIsWatching(true);
    }
  }

  const handleRemoveWatchList = async() => {

  }

  if (isWatching === false){
    return (
      <button onClick={()=>{handleAddWatchList()}}>★</button>
    );
  } else if (isWatching === true) {
    return (
      <button onClick={()=>{handleRemoveWatchList()}}>★</button>
    );
  }
}
