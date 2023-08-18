import React, { useState, useEffect } from 'react';
import AdminPage from './Inventory/AdminPage'
import ViewMore from './Inventory/ViewMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Trolley from './Inventory/Trolley';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPastOrders, handleAddGoods, handleAllCart, handleAmends, handleChanges, handleCheckingOut, handleFetch, handleFetchCart, handleModal, handle_Adress_Amends, handle_Display_Order, handle_Email_Password, handle_Logged_In, handle_My_Address, handle_My_Details, handle_Search } from './Inventory/myRedux/myActions';
import RegistrationPage from './Inventory/signIn';
import UserPage from './Inventory/UserPage';
import UserAccount from './Inventory/userAccount';
import AllOrders from './Inventory/myOrders';
import MyDetails from './Inventory/myDetails';
import MyAddress from './Inventory/address';
import MyPreference from './Inventory/preferencePage';

const App = () => {
  let dispatch = useDispatch();
  let goods = useSelector(state => state.allGoods)
  let customerQuantity = 0
  let addItem = true;
  let itemEdit = true;

  const handleAddItem = (goodsDetails) => {
    dispatch(handleAddGoods(goodsDetails, customerQuantity, addItem, itemEdit))
  }

  const handleGoods = () => {
    dispatch(handleFetch())
  }

  const handleCart = (value) => {
    let { itemId } = value
    let data = goods.find(good => good._id === itemId)
    dispatch(handleAllCart(value, data))
  }

  const handle_Fetch_Cart = () => {
    dispatch(handleFetchCart())
  }

  const handleCheckOut = () => {
    dispatch(handleCheckingOut())
  }

  const handleEditDelete = (data) => {
    dispatch(handleAmends(data))
  }

  const handleLogin_SignUp = (data) => {
    dispatch(handle_Email_Password(data))
  }

  const handle_Modal = () => {
    dispatch(handleModal())
  }

  const handle_Changes = (data) => {
    dispatch(handleChanges(data))
  }

  const handleFetchPastOrder = () => {
    dispatch(fetchPastOrders())
  }

  const handleDisplay = (id) => {
    dispatch(handle_Display_Order(id))
  }

  const handleMyAddress = () => {
    dispatch(handle_My_Address())
  }

  const handleMyDetails = () => {
    dispatch(handle_My_Details())
  }

  const handleAmends = (type, addressId) => {
    dispatch(handle_Adress_Amends(type, addressId))
  }
  const handleUserLogged = () => {
    dispatch(handle_Logged_In())
  }

  return (
    <>

      <Routes>
        <Route path='/*' element={<UserPage handleUserLogged={handleUserLogged} handleGoods={handleGoods} handleCart={handleCart} handle_Fetch_Cart={handle_Fetch_Cart} />} />
        <Route path='/adminpage' element={<AdminPage handleAddItem={handleAddItem} handleEditDelete={handleEditDelete} />} />
        <Route path='/viewmore/:itemId' element={<ViewMore handleCart={handleCart} handle_Fetch_Cart={handle_Fetch_Cart} />} />
        <Route path='/trolley' element={<Trolley handleCart={handleCart} handleCheckOut={handleCheckOut} handle_Modal={handle_Modal} handle_Fetch_Cart={handle_Fetch_Cart} />} />
        <Route path='/signIn' element={<RegistrationPage handleLogin_SignUp={handleLogin_SignUp} handle_Modal={handle_Modal} />} />
        <Route path='/useraccount' element={<UserAccount handleMyDetails={handleMyDetails} handle_Fetch_Cart={handle_Fetch_Cart} />} />
        <Route path='/allorders' element={<AllOrders handleUserLogged={handleUserLogged} handleDisplay={handleDisplay} handleFetchPastOrder={handleFetchPastOrder} />} />
        <Route path='mydetails' element={<MyDetails handleUserLogged={handleUserLogged} handle_Changes={handle_Changes} handleMyDetails={handleMyDetails} />} />
        <Route path='address' element={<MyAddress handleUserLogged={handleUserLogged} handle_Changes={handle_Changes} handleMyAddress={handleMyAddress} handleAmends={handleAmends} />} />
        <Route path='mypref' element={<MyPreference handleUserLogged={handleUserLogged} />} />
      </Routes >
    </>

  )
}
export default App;