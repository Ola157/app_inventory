import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
const InputPage = ({ each: { item, quantity, price, detail, image, itemEdit, id }, index, handleEditDelete }) => {
    let [nitem, setItem] = useState('')
    let [nquantity, setQty] = useState('')
    let [nprice, setPrice] = useState('')
    let [ndetail, setDetail] = useState('')

    return (<Container className='px-0 pe-0 display'>
        Product {index + 1}
        <hr className='w-100 my-0'></hr>
        < img className='h-10 w-100 img' src={require(`./assets/imgs/${image}`)} />
        <hr className='w-100 my-0'></hr>
        <div> {itemEdit !== 'edit' ? item : <input className='border rounded text-center' placeholder='item' onInput={(event) => setItem(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div> {itemEdit !== 'edit' ? quantity : <input className='border rounded text-center' placeholder='quantity' onInput={(event) => setQty(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div> {itemEdit !== 'edit' ? <>${price}</> : <input className='border rounded text-center' placeholder='price' onInput={(event) => setPrice(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div className='text-center px-1 p-1'> {itemEdit !== 'edit' ? detail : <input className='border rounded text-center' placeholder='detail' onInput={(event) => setDetail(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div className='text-center'><button className='border rounded py-0 m-1 btnDis' onClick={() => handleEditDelete('rem', id)}> Delete</button >{itemEdit !== 'edit' ? <button className='border rounded py-0 m-1 btnDis' onClick={() => handleEditDelete('edit', id)}>Edit</button> : <button className='border rounded py-0 m-1 btnDis' onClick={() => handleEditDelete('done', id, nitem, nquantity, nprice, ndetail)}>Done</button>}</div>
    </Container>)
}
export default InputPage;