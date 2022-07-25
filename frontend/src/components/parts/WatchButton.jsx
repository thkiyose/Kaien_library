import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
import { addWatchList } from '../../lib/api/watchlist'

export const WatchButton = (props) => {
  const { currentUser } = useContext(Context);
  const [ isWatching, setIsWatching ] = useState(false);
  const bookId = props;

  useEffect(() => {
    const fetchIsWatching = async () => {
      const res = await fetchPreviousLendings(currentUser.id)
      setLendings(res.data.lendings);
      setIsLoading(false);
    };
    fetchLendings();
  }, []);

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
      <button onClick={()=>{handleAddWatchList()}}>☆</button>
    );
  } else if (isWatching === true) {
    return (
      <button onClick={()=>{handleRemoveWatchList()}}>★</button>
    );
  }
}
