import React, { useState, useEffect } from 'react';
import AdminPage from './Inventory/AdminPage'
import UserPage from './Inventory/UserPage';
import ViewMore from './Inventory/ViewMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Trolley from './Inventory/Trolley';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  const [boo, setBoo] = useState(true)
  const navigate = useNavigate()
  let custQuantity = 0
  let addItem;
  let itemEdit;

  let [products, setProds] = useState([
    { image: 'banana.jpg', item: 'Banana', quantity: 100, detail: 'It is known for its sweet flavor and soft texture, making it a favorite snack for people of all ages. Bananas are a great source of essential vitamins and minerals, including potassium, vitamin C, and vitamin B6.', price: 300, id: 0, itemEdit },
    { image: 'orange.jpg', item: 'Orange', quantity: 100, detail: 'Oranges are citrus fruits known for their refreshing taste and high vitamin C content. They are juicy and have a bright orange color, making them a popular choice for both eating and juicing.', price: 300, id: 1, itemEdit },
    { image: 'avocado.jpg', item: 'Avocado', quantity: 100, detail: 'creamy fruit with a rich, buttery texture. It is packed with healthy fats, fiber, and various vitamins and minerals. Avocado is versatile and often used in salads, sandwiches, and as a base for guacamole.', price: 300, id: 2, itemEdit },
    { image: 'apple.jpg', item: 'Apple', quantity: 100, detail: ' Apples are one of the most popular fruits worldwide. They come in a variety of flavors and textures, from sweet to tart and crisp to soft. Apples are known for their high fiber content and are often eaten fresh, used in baking, or transformed into juice or cider.', price: 300, id: 3, itemEdit },
    { image: 'watermelon.jpg', item: 'Water Melon', quantity: 100, detail: 'Watermelon is a large, juicy fruit with a sweet and refreshing taste. It has a bright red or pink flesh and is incredibly hydrating. Watermelon is commonly eaten fresh, sliced into wedges, or used in salads, smoothies, and refreshing beverages.', price: 300, id: 4, itemEdit },
    { image: 'pineapple.jpg', item: 'Pineapple', quantity: 100, detail: ' Pineapple is a tropical fruit with a spiky skin and a sweet, tangy taste. It has a vibrant yellow flesh and is rich in vitamins, minerals, and enzymes. Pineapple is commonly enjoyed fresh, used in fruit salads, added to savory dishes, or used in desserts like cakes and tarts.', price: 300, id: 5, itemEdit },
    { image: 'cherry.jpg', item: 'Cherry', quantity: 100, detail: 'Cherries are small, round fruits with a bright red or dark purple skin and a sweet-tart taste. They are often enjoyed fresh or used in desserts, such as pies and tarts. Cherries can also be dried, juiced, or used in preserves.', price: 300, id: 6, itemEdit },
    { image: 'strawberry.jpg', item: 'Strawberry', quantity: 100, detail: 'Strawberries are vibrant, red fruits known for their sweet and tangy flavor. They have a juicy texture and are often enjoyed fresh or used in various culinary creations like desserts, smoothies, and salads.', price: 300, id: 7, itemEdit },
    { image: 'mango.jpg', item: 'Mango', quantity: 100, detail: 'Mangos are tropical fruits with a sweet and tropical flavor. They have a juicy flesh and are rich in vitamins, minerals, and antioxidants. Mangos are commonly eaten fresh, blended into smoothies, or used in salsas and chutneys.', price: 300, id: 8, itemEdit },
    { image: 'grape.jpg', item: 'Grape', quantity: 100, detail: 'Grapes are small, round fruits that grow in clusters. They come in various colors, including green, red, and purple. Grapes are sweet, juicy, and refreshing, making them a popular snack. They can also be used to make juices, jams, and wines.', price: 300, id: 9, itemEdit },
    { image: 'plum.jpg', item: 'Plum', quantity: 100, detail: 'They come in various colors, including red, purple, and yellow. Plums can be enjoyed fresh, dried, or used in jams, jellies, and baked goods.', price: 300, id: 10, itemEdit },
    { image: 'pear.jpg', item: 'Pear', quantity: 100, detail: 'Pears are juicy and sweet fruits with a distinctive shape and a smooth skin. They come in different varieties, offering a range of flavors from crisp and slightly tart to soft and buttery. Pears are commonly eaten fresh, added to salads, or used in baking.', price: 300, id: 11, itemEdit },
    { image: 'peach.jpg', item: 'Peach', quantity: 100, detail: 'Peaches are sweet and juicy fruits with a soft flesh and fuzzy skin. They come in different varieties, offering a delightful combination of flavors, including sweetness and a hint of tartness.', price: 300, id: 12, itemEdit },
    { image: 'guava.jpg', item: 'Guava', quantity: 100, detail: 'Guavas are tropical fruits with a unique flavor that combines sweetness and tartness. They have a fragrant aroma and a creamy texture. Guavas can be eaten fresh, used in smoothies, made into jams or jellies, or used in desserts.', price: 300, id: 13, itemEdit },
    { image: 'kiwi.jpg', item: 'Kiwi', quantity: 100, detail: 'Kiwi is a small, egg-shaped fruit with a fuzzy brown skin and bright green flesh. It has a sweet and tangy taste, often described as a mix of strawberry, banana, and pineapple flavors. Kiwis are commonly eaten fresh or used in fruit salads, smoothies, or as a garnish.', price: 300, id: 14, itemEdit },
    { image: 'potatoe.jpg', item: 'Potatoes', quantity: 100, detail: 'Potatoes are starchy vegetables with a neutral flavor that can be cooked in various ways. They are versatile and can be boiled, baked, mashed, fried, or roasted. Potatoes are a staple in many cuisines and can be used as a main ingredient or as a side dish.', price: 300, id: 15, itemEdit }
  ]);


  let [cart, setCart] = useState([
    { image: 'banana.jpg', item: 'Banana', price: 300, custQuantity, addItem, id: 0, detail: 'It is known for its sweet flavor and soft texture, making it a favorite snack for people of all ages. Bananas are a great source of essential vitamins and minerals, including potassium, vitamin C, and vitamin B6.' },
    { image: 'orange.jpg', item: 'Orange', price: 300, custQuantity, addItem, id: 1, detail: 'Oranges are citrus fruits known for their refreshing taste and high vitamin C content. They are juicy and have a bright orange color, making them a popular choice for both eating and juicing.' },
    { image: 'avocado.jpg', item: 'Avocado', price: 300, custQuantity, addItem, id: 2, detail: 'creamy fruit with a rich, buttery texture. It is packed with healthy fats, fiber, and various vitamins and minerals. Avocado is versatile and often used in salads, sandwiches, and as a base for guacamole.' },
    { image: 'apple.jpg', item: 'Apple', price: 300, custQuantity, addItem, id: 3, detail: ' Apples are one of the most popular fruits worldwide. They come in a variety of flavors and textures, from sweet to tart and crisp to soft. Apples are known for their high fiber content and are often eaten fresh, used in baking, or transformed into juice or cider.' },
    { image: 'watermelon.jpg', item: 'Watermelon', price: 300, custQuantity, addItem, id: 4, detail: 'Watermelon is a large, juicy fruit with a sweet and refreshing taste. It has a bright red or pink flesh and is incredibly hydrating. Watermelon is commonly eaten fresh, sliced into wedges, or used in salads, smoothies, and refreshing beverages.' },
    { image: 'pineapple.jpg', item: 'Pineapple', price: 300, custQuantity, addItem, id: 5, detail: ' Pineapple is a tropical fruit with a spiky skin and a sweet, tangy taste. It has a vibrant yellow flesh and is rich in vitamins, minerals, and enzymes. Pineapple is commonly enjoyed fresh, used in fruit salads, added to savory dishes, or used in desserts like cakes and tarts.' },
    { image: 'cherry.jpg', item: 'Cherry', price: 300, custQuantity, addItem, id: 6, detail: 'Cherries are small, round fruits with a bright red or dark purple skin and a sweet-tart taste. They are often enjoyed fresh or used in desserts, such as pies and tarts. Cherries can also be dried, juiced, or used in preserves.' },
    { image: 'strawberry.jpg', item: 'Strawberry', price: 300, custQuantity, addItem, id: 7, detail: 'Strawberries are vibrant, red fruits known for their sweet and tangy flavor. They have a juicy texture and are often enjoyed fresh or used in various culinary creations like desserts, smoothies, and salads.' },
    { image: 'mango.jpg', item: 'Mango', price: 300, custQuantity, addItem, id: 8, detail: 'Mangos are tropical fruits with a sweet and tropical flavor. They have a juicy flesh and are rich in vitamins, minerals, and antioxidants. Mangos are commonly eaten fresh, blended into smoothies, or used in salsas and chutneys.' },
    { image: 'grape.jpg', item: 'Grape', price: 300, custQuantity, addItem, id: 9, detail: 'Grapes are small, round fruits that grow in clusters. They come in various colors, including green, red, and purple. Grapes are sweet, juicy, and refreshing, making them a popular snack. They can also be used to make juices, jams, and wines.' },
    { image: 'plum.jpg', item: 'Plum', price: 300, custQuantity, addItem, id: 10, detail: 'They come in various colors, including red, purple, and yellow. Plums can be enjoyed fresh, dried, or used in jams, jellies, and baked goods.' },
    { image: 'pear.jpg', item: 'Pear', price: 300, custQuantity, addItem, id: 11, detail: 'Pears are juicy and sweet fruits with a distinctive shape and a smooth skin. They come in different varieties, offering a range of flavors from crisp and slightly tart to soft and buttery. Pears are commonly eaten fresh, added to salads, or used in baking.' },
    { image: 'peach.jpg', item: 'Peach', price: 300, custQuantity, addItem, id: 12, detail: 'Peaches are sweet and juicy fruits with a soft flesh and fuzzy skin. They come in different varieties, offering a delightful combination of flavors, including sweetness and a hint of tartness.' },
    { image: 'guava.jpg', item: 'Guava', price: 300, custQuantity, addItem, id: 13, detail: 'Guavas are tropical fruits with a unique flavor that combines sweetness and tartness. They have a fragrant aroma and a creamy texture. Guavas can be eaten fresh, used in smoothies, made into jams or jellies, or used in desserts.' },
    { image: 'kiwi.jpg', item: 'Kiwi', price: 300, custQuantity, addItem, id: 14, detail: 'Kiwi is a small, egg-shaped fruit with a fuzzy brown skin and bright green flesh. It has a sweet and tangy taste, often described as a mix of strawberry, banana, and pineapple flavors. Kiwis are commonly eaten fresh or used in fruit salads, smoothies, or as a garnish.' },
    { image: 'potatoe.jpg', item: 'Potatoe', price: 300, custQuantity, addItem, id: 15, detail: 'Potatoes are starchy vegetables with a neutral flavor that can be cooked in various ways. They are versatile and can be boiled, baked, mashed, fried, or roasted. Potatoes are a staple in many cuisines and can be used as a main ingredient or as a side dish.' }
  ])



  const handleAddItem = async (prods) => {
    let { item, quantity, image, price, detail, itemEdit, id } = prods
    if (item !== '' && quantity !== '' && price !== '' && detail !== '' && image !== '') {
      setProds([...products, { item, quantity, image, price, detail, itemEdit, id }])
      setCart([...cart, { image, item, price, custQuantity, addItem, id, detail }])
    }

    else { alert('inputs cant be blank') }
  }

  const handleCart = (any, e, id) => {
    let allCart = [...cart]
    let allProds = [...products]
    let checkQty = products.find(item => item.id === id)

    switch (any) {
      case 'addItem':
        setCart(allCart.map(a => a.id === id ? ({
          ...a,
          addItem: any,
          custQuantity: checkQty.quantity < 1 ? 'out of stock' : 1
        }) : a))
        break;

      case 'add':
        setCart(allCart.map(item => item.id === id ? ({
          ...item,
          custQuantity: item.custQuantity += 1,
          custQuantity: item.custQuantity > checkQty.quantity ? alert('out of stock') : item.custQuantity,
          custQuantity: item.custQuantity > checkQty.quantity ? checkQty.quantity : item.custQuantity
        }) : item))
        break;

      case 'sub':
        setCart(cart.map(item => item.id === id && item.custQuantity !== 'out of stock' ? ({
          ...item,
          custQuantity: item.custQuantity -= 1,
          custQuantity: item.custQuantity < 1 ? item.custQuantity = 0 : item.custQuantity,
          addItem: item.custQuantity < 1 || item.custQuantity === 0 ? '!addItem' : item.addItem
        }) : item))
        break;

      case true:
        setBoo(false)
        break;

      case false:
        setBoo(true)
        break;

      case 'checkOut':
        let filterCart = allCart.filter(item => item.custQuantity > 0)
        for (let index = 0; index < filterCart.length; index++) {
          let cartId = filterCart[index].id
          allProds[cartId].quantity -= filterCart[index].custQuantity
        }
        setProds(allProds)
        alert('payment successful')

        setCart(allCart.map(item => item.custQuantity > 0 ? ({
          ...item,
          custQuantity: 0,
          addItem: '!addItem'
        }) : item))

        navigate('/')
        break;

      case 'empty':
        setCart(allCart.map(item => ({
          ...item,
          custQuantity: 0,
          addItem: '!addItem'
        })))
        navigate('/')
        break;
    }

  }

  const handleEditDelete = (any, id, item, quantity, price, detail) => {
    let myProds = [...products]
    let allCart = [...cart]

    switch (true) {
      case any === 'rem':
        setProds(myProds.filter((item, i) => item.id !== id));
        setCart(allCart.filter((item, i) => item.id !== id));
        break;
      case any === 'edit':
        setProds(myProds.map((item, i) => id === item.id ? ({
          ...item,
          itemEdit: any
        }) : item));
        break;
      case any === 'done':
        if (item !== '' && quantity !== '' && price !== '' && detail !== '') {
          setProds(myProds.map((items, i) => id === items.id ? ({
            ...items,
            item: item,
            quantity: quantity,
            price: price,
            detail: detail,
            itemEdit: any
          }) : items));

          setCart(allCart.map((items, i) => id === items.id ? ({
            ...items,
            item: item,
            price: price,
            detail: detail,
          }) : items))
        }
        break;
    }

  }

  return (
    <>
      <Routes>
        <Route path='/*' element={<UserPage cart={cart} boo={boo} handleCart={handleCart} />} />
        <Route path='/adminpage' element={<AdminPage products={products} handleAddItem={handleAddItem} handleEditDelete={handleEditDelete} />} />
        <Route path='/viewmore/:itemId' element={<ViewMore cart={cart} handleCart={handleCart} />} />
        <Route path='/trolley' element={<Trolley cart={cart} handleCart={handleCart} />} />
      </Routes >
    </>

  )
}
export default App;