import React, { useContext } from 'react';
import { Context } from '../../App';

export const FavButton = () => {
  const { currentUser } = useContext(Context);
  return (
    <p>★</p>
  );
}
