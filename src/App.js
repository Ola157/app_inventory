import React, { useState, useEffect } from 'react';
import AdminPage from './Inventory/AdminPage'
import UserPage from './Inventory/UserPage';
import ViewMore from './Inventory/ViewMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Trolley from './Inventory/Trolley';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddGoods, handleAllCart, handleAmends, handleCheckingOut, handleFetch } from './Inventory/myRedux/myActions';

const App = () => {
  let dispatch = useDispatch();
  let goods = useSelector(state => state.allGoods)
  const [boo, setBoo] = useState(true)
  const navigate = useNavigate()
  let customerQuantity = 0
  let addItem = true;
  let itemEdit = true;

  const handleAddItem = async (goodsDetails) => {
    dispatch(handleAddGoods(goodsDetails, customerQuantity, addItem, itemEdit))
  }

  const handleGoods = () => {
    dispatch(handleFetch())
  }

  const handleCart = (any, value, id) => {
    dispatch(handleAllCart(any, value, id))
  }

  const handleCheckOut = () => {
    let allGoods = goods.filter(good => good.customerQuantity > 0)
    dispatch(handleCheckingOut(allGoods))
  }

  const handleEditDelete = (value) => {
    dispatch(handleAmends(value))
  }

  return (
    <>

      <Routes>
        <Route path='/*' element={<UserPage boo={boo} handleGoods={handleGoods} handleCart={handleCart} />} />
        <Route path='/adminpage' element={<AdminPage handleAddItem={handleAddItem} handleEditDelete={handleEditDelete} />} />
        <Route path='/viewmore/:itemId' element={<ViewMore handleCart={handleCart} />} />
        <Route path='/trolley' element={<Trolley handleCart={handleCart} handleCheckOut={handleCheckOut} />} />
      </Routes >
    </>

  )
}
export default App;