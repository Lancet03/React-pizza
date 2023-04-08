import './scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizzaInfo from './FullPizzaInfo';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    // <div className="wrapper">
    //     <Header />
    //     <div className="content">
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizzaInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    //     </div>
    // </div>
  );
}

export default App;
