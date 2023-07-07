import React, { useState, useEffect } from 'react';
import AdminPage from './Inventory/AdminPage'
import UserPage from './Inventory/UserPage';
import ViewMore from './Inventory/ViewMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Trolley from './Inventory/Trolley';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  let [products, setProds] = useState([
    { image: 'banana.jpg', item: 'banana', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 0 },
    { image: 'orange.jpg', item: 'Orange', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 1 },
    { image: 'avocado.jpg', item: 'Avocado', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 2 },
    { image: 'apple.jpg', item: 'Apple', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 3 },
    { image: 'watermelon.jpg', item: 'Water Melon', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 4 },
    { image: 'pineapple.jpg', item: 'Pineapple', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 5 },
    { image: 'cherry.jpg', item: 'Cherry', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 6 },
    { image: 'strawberry.jpg', item: 'Strawberry', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 7 },
    { image: 'mango.jpg', item: 'mango', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 9 },
    { image: 'grape.jpg', item: 'grape', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 10 },
    { image: 'plum.jpg', item: 'plum', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 11 },
    { image: 'pear.jpg', item: 'pear', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 13 },
    { image: 'peach.jpg', item: 'peach', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 14 },
    { image: 'guava.jpg', item: 'guava', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 15 },
    { image: 'kiwi.jpg', item: 'kiwi', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 16 },
    { image: 'potatoe.jpg', item: 'potatoes', quantity: 100, detail: 'Ripe and Farm Fresh', price: 300, cusQty: 0, editAdd: '', id: 17 }
  ]);

  const [boo, setBoo] = useState(true)
  let [cart, setCart] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let allProds = [...products]
    setCart(allProds.filter(items => items.cusQty > 0))

  }, [products])

  const handleItem = async (prods) => {
    let { item, quantity, image, price, detail, cusQty, editAdd, id } = prods
    if (item !== '' && quantity !== '' && price !== '' && detail !== '' && image !== '') {
      setProds([...products, prods])
    }

    else { alert('inputs cant be blank') }
  }

  const handleAllItem = (any, e, id) => {
    let allProds = [...products]
    switch (true) {
      case any == 'addItem':
        setProds(allProds.map(a => a.id === id ? ({
          ...a,
          editAdd: any,
          cusQty: a.quantity < 1 ? 'out of stock' : 1
        }) : a))
        break;

      case any == 'add':
        setProds(allProds.map(a => a.id === id ? ({
          ...a,
          cusQty: a.cusQty += 1,
          cusQty: a.cusQty > a.quantity ? alert('out of stock') : a.cusQty,
          cusQty: a.cusQty > a.quantity ? a.quantity : a.cusQty
        }) : a))
        break;

      case any == 'sub':
        setProds(allProds.map(a => a.id === id ? ({
          ...a,
          cusQty: a.cusQty -= 1,
          cusQty: a.cusQty < 1 ? a.cusQty = 0 : a.cusQty,
          editAdd: a.cusQty < 1 || a.cusQty === 0 ? '!addItem' : a.editAdd
        }) : a))
        break;

      case any === true:
        setBoo(false)
        break;

      case any === false:
        setBoo(true)
        break;

      case any === 'checkOut':
        setProds(allProds.map(a => a.cusQty > 0 ? ({
          ...a,
          quantity: a.quantity -= a.cusQty,
          quantity: a.quantity < 1 ? 0 : a.quantity,
          cusQty: 0,
          editAdd: '!addItem'
        }) : a))
        alert('payment successful')
        navigate('/')
        break;

      case any === 'empty':
        setProds(allProds.map(a => ({
          ...a,
          cusQty: 0,
          editAdd: '!addItem'
        })))
        navigate('/')
        break;
    }

  }

  const handleRem = (any, id, item, quantity, price, detail) => {
    let myProds = [...products]
    switch (true) {
      case any === 'rem':
        setProds(myProds.filter((a, i) => a.id !== id));
        break;
      case any === 'edit':
        setProds(myProds.map((a, i) => id === a.id ? ({
          ...a,
          editAdd: any
        }) : a));
        break;
      case any === 'done':
        if (item !== '' && quantity !== '' && price !== '' && detail !== '') {
          setProds(myProds.map((a, i) => id === a.id ? ({
            ...a,
            item: item,
            quantity: quantity,
            price: price,
            detail: detail,
            editAdd: '!edit'
          }) : a));
        }
        break;
    }

  }

  return (
    <>
      <Routes>
        <Route path='/*' element={<UserPage products={products} cart={cart} boo={boo} handleAllItem={handleAllItem} />} />
        <Route path='/adminpage' element={<AdminPage products={products} handleItem={handleItem} handleRem={handleRem} />} />
        <Route path='/viewmore/:itemId' element={<ViewMore products={products} cart={cart} handleAllItem={handleAllItem} />} />
        <Route path='/trolley' element={<Trolley cart={cart} handleAllItem={handleAllItem} />} />
      </Routes >
    </>

  )
}
export default App;