import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { Context } from '../../App';
import { addWatchList } from '../../lib/api/watchlist'
import { removeWatchList } from '../../lib/api/watchlist'
import { fetchIsWatching } from '../../lib/api/watchlist'

const Icon = styled.input`
  width: 60px;
`

export const WatchButton = (props) => {
  const { currentUser } = useContext(Context);
  const [ isWatching, setIsWatching ] = useState(false);
  const [ watchListId, setWatchListId ] = useState(0);
  const bookId = props;

  useEffect(() => {
    const handleFetchIsWatching = async () => {
      const res = await fetchIsWatching(currentUser.id, bookId.bookId)
      if (res.data.isWatching === true) {
        setWatchListId(res.data.id)
        setIsWatching(res.data.isWatching);
      }
    };
    handleFetchIsWatching();
  }, [currentUser.id, bookId.bookId]);

  const handleAddWatchList = async() => {
    const res = await addWatchList({Id:currentUser.id, bookId: bookId.bookId})
    if (res.data.status === "SUCCESS") {
      setIsWatching(true);
      setWatchListId(res.data.id)
    } else {
      console.log(res);
    }
  }

  const handleRemoveWatchList = async() => {
    const res = await removeWatchList(watchListId)
    if (res.data.status === "SUCCESS") {
      setIsWatching(false);
    } else {
      console.log(res);
    }
  }

  if (isWatching === false){
    return (
      <Icon type="image" src={`${process.env.PUBLIC_URL}/add.png`} onClick={()=>{handleAddWatchList()}} />
    );
  } else if (isWatching === true) {
    return (
        <Icon type="image" src={`${process.env.PUBLIC_URL}/remove.png`} onClick={()=>{handleRemoveWatchList()}} />
    );
  }
}
