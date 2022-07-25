import React, { useContext } from 'react';
import { Context } from '../../App';

export const WatchButton = () => {
  const { currentUser } = useContext(Context);
  return (
    <p>★</p>
  );
}
