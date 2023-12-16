import React, { useEffect } from 'react';
import AdminPage from './Inventory/AdminPage'
import ViewMore from './Inventory/ViewMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Trolley from './Inventory/Trolley';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddAddress,
  funcAbout,
  funcHelp,
  funcLink,
  funcMenu,
  funcNavClose,
  funcSearch,
  funcStore,
  funcWeb,
  handleAddGoods,
  handleAddressDelete,
  handleAllRecords,
  handleAuth,
  handleCartChanges,
  handleCartPull,
  handleCheckingOut,
  handleFetchAddress,
  handleFetchPersonalDetails,
  handleGetGoods,
  handleIsReg,
  handleMessage,
  handleMessageCancel,
  handleProductChanges,
  handleRecord,
  handleSearch,
  handleSignOut,
  handleUpdateDetails,
  handleUserQuantity,
  handleViewed,
} from './Inventory/myRedux/myActions';


import RegistrationPage from './Inventory/signIn';
import UserPage from './Inventory/UserPage';
import UserAccount from './Inventory/userAccount';
import MyDetails from './Inventory/myDetails';
import MyAddress from './Inventory/address';
import MyPreference from './Inventory/preferencePage';
import Records from './Inventory/myOrders';
import RecordPage from './Inventory/record';
import LandingPage from './Inventory/landingpage';

const App = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.isLogged)
  const isClickRegister = useSelector(state => state.isClickRegister)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) return
    handlePullCart()
  }, [isLogged])


  const navBtn = (toggleType) => {
    switch (toggleType) {
      case 'search':
        dispatch(funcSearch());
        break
      case 'menu':
        dispatch(funcMenu());
        break
      case 'store':
        dispatch(funcStore());
        break
    }
  }

  const footerBtn = (toggleType) => {
    switch (toggleType) {
      case 'help':
        dispatch(funcHelp())
        break;
      case 'about':
        dispatch(funcAbout())
        break;
      case 'website':
        dispatch(funcWeb())
        break;
      case 'links':
        dispatch(funcLink())
        break;
    }
  }

  const handleAddItem = (data) => {
    dispatch(handleAddGoods(data))
  }

  const handleGoods = () => {
    dispatch(handleGetGoods())
  }

  const cartHandler = (type, itemId) => {
    dispatch(handleCartChanges(type, itemId));
  }

  const handlePullCart = (kind) => {
    dispatch(handleCartPull(kind))
  }

  const handleAddClick = (data) => {
    const { itemId, newUserQuantity, quantity, page } = data;
    if (!isLogged) {
      return handleNavigation(`/signIn/${page}/${itemId}`);
    } else if (quantity > newUserQuantity + 1) {
      dispatch(handleUserQuantity(itemId, newUserQuantity + 1));
    } else if (quantity >= newUserQuantity + 1) {
      dispatch(handleUserQuantity(itemId, quantity));
    } else if (quantity < newUserQuantity + 1) {
      handleIncomingMessage(`Item Out Of Stock, only ${quantity} available`);
    }
  };


  const handleSubtractClick = (data) => {
    const { itemId, newUserQuantity } = data;
    if (newUserQuantity > 1) {
      dispatch(handleUserQuantity(itemId, newUserQuantity - 1));
    } else {
      dispatch(handleUserQuantity(itemId, 0));
    }
  };

  const handleViewedItem = (itemId) => {
    dispatch(handleViewed(itemId))
  }

  const handleSearchedItem = (event) => {
    dispatch(handleSearch(event))
  }

  const handleCheckOut = () => {
    dispatch(handleCheckingOut())
    setTimeout(() => {
      handlePullCart()
    }, 1000)
  }

  const handleProductAmends = (data) => {
    dispatch(handleProductChanges(data))
  }

  const handleAuthentication = (data) => {
    dispatch(handleAuth(data))
  }

  const handleLogOut = () => {
    localStorage.removeItem('accessToken')
    handleNavigation('/')
    dispatch(handleSignOut())
  }

  const handleIncomingMessage = (message) => {
    dispatch(handleMessage(message))
  }

  const handleAddAddress = (data) => {
    dispatch(AddAddress(data))

  }

  const handleUpdateUser = (data) => {
    dispatch(handleUpdateDetails(data))
  }

  const handleOrderRecords = () => {
    dispatch(handleAllRecords())
  }

  const handleGetAddress = () => {
    dispatch(handleFetchAddress())
  }

  const handlePersonalDetails = () => {
    dispatch(handleFetchPersonalDetails())
  }

  const handleAmends = (addressId) => {
    dispatch(handleAddressDelete(addressId))
    setTimeout(() => {
      handleGetAddress()
    }, 500)
  }

  const handleNavigation = (page) => {
    dispatch(funcNavClose());

    navigate(page)

    if (isClickRegister) {
      handleIsRegister(false)
    }

  }

  const handleIsRegister = (value) => {
    dispatch(handleIsReg(value))
  }

  const handleRecordPull = (recordId) => {
    dispatch(handleRecord(recordId))
  }

  return (
    <>

      <Routes>
        <Route path='/*'
          element={<UserPage
            handleAddClick={handleAddClick}
            handleSubtractClick={handleSubtractClick}
            handleLogOut={handleLogOut}
            handleNavigation={handleNavigation}
            handlePullCart={handlePullCart}
            handleSearchedItem={handleSearchedItem}
            handleGoods={handleGoods}
          />} />

        <Route path='/l' element={<LandingPage
          footerBtn={footerBtn}
          navBtn={navBtn}
          handleNavigation={handleNavigation} />}
        />

        <Route path='/adminpage'
          element={<AdminPage
            handleNavigation={handleNavigation}
            handleAddItem={handleAddItem}
            handleProductAmends={handleProductAmends} />} />

        <Route path='/viewmore/:itemId'
          element={<ViewMore
            handleNavigation={handleNavigation}
            handleAddClick={handleAddClick}
            handleSubtractClick={handleSubtractClick}
            handleLogOut={handleLogOut}
            handleIncomingMessage={handleIncomingMessage}
            handleViewedItem={handleViewedItem}
          />} />

        <Route path='/trolley'
          element={<Trolley
            handlePullCart={handlePullCart}
            handleNavigation={handleNavigation}
            cartHandler={cartHandler}
            handleCheckOut={handleCheckOut} />} />

        <Route path='/signIn/:page/:itemId'
          element={<RegistrationPage
            footerBtn={footerBtn}
            navBtn={navBtn}
            handlePullCart={handlePullCart}
            handleAddClick={handleAddClick}
            handleIsRegister={handleIsRegister}
            handleNavigation={handleNavigation}
            handleIncomingMessage={handleIncomingMessage}
            handleAuthentication={handleAuthentication} />} />

        <Route path='/useraccount'
          element={<UserAccount
            handleNavigation={handleNavigation}
            handlePersonalDetails={handlePersonalDetails}
            handleLogOut={handleLogOut} />} />

        <Route path='/allorders'
          element={<Records
            handleNavigation={handleNavigation}
            handleLogOut={handleLogOut}
            handleOrderRecords={handleOrderRecords} />} />

        <Route path='/record/:recordId'
          element={<RecordPage
            handleRecordPull={handleRecordPull}
            handleNavigation={handleNavigation}
          />}
        />

        <Route path='/mydetails'
          element={<MyDetails
            handleNavigation={handleNavigation}
            handleUpdateUser={handleUpdateUser}
            handleLogOut={handleLogOut}
            handlePersonalDetails={handlePersonalDetails} />} />

        <Route path='/address'
          element={<MyAddress
            handleNavigation={handleNavigation}
            handleLogOut={handleLogOut}
            handleIncomingMessage={handleIncomingMessage}
            handleAddAddress={handleAddAddress}
            handleGetAddress={handleGetAddress}
            handleAmends={handleAmends} />} />

        <Route path='/mypref'
          element={<MyPreference
            handleNavigation={handleNavigation}
            handleLogOut={handleLogOut} />} />
      </Routes >
    </>

  )
}
export default App;