import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} />
        <Route exact path={"/signup"} />
      </Routes>
     </BrowserRouter>
  );
};
