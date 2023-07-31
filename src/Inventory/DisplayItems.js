import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
const InputPage = ({ each: { item, quantity, price, detail, image, itemEdit, _id }, index, handleEditDelete }) => {
    let [nitem, setItem] = useState('')
    let [nquantity, setQty] = useState('')
    let [nprice, setPrice] = useState('')
    let [ndetail, setDetail] = useState('')
    let [nimage, setNImage] = useState('')

    const setImage = e => {
        setNImage(e.target.files[0])
    }

    return (<Container className='px-0 pe-0 display'>
        Product {index + 1}
        <hr className='w-100 my-0'></hr>
        <div>{itemEdit !== 'edit' ? < img className='h-10 w-100 img' src={`http://localhost:9810/${image}`} /> : <input className='border rounded text-center' placeholder='item' onInput={setImage} />} </div>
        <hr className='w-100 my-0'></hr>
        <div> {itemEdit ? item : <input className='border rounded text-center' placeholder='item' onInput={(event) => setItem(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div> {itemEdit ? quantity : <input className='border rounded text-center' placeholder='quantity' onInput={(event) => setQty(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div> {itemEdit ? <>${price}</> : <input className='border rounded text-center' placeholder='price' onInput={(event) => setPrice(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div className='text-center px-1 p-1'> {itemEdit ? detail : <input className='border rounded text-center' placeholder='detail' onInput={(event) => setDetail(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div className='text-center'><button className='border rounded py-0 m-1 btnDis' onClick={() => handleEditDelete({ any: 'remove', _id })}> Delete</button >{itemEdit ? <button className='border rounded py-0 m-1 btnDis' onClick={() => handleEditDelete({ any: 'edit', _id })}>Edit</button> : <button className='border rounded py-0 m-1 btnDis' onClick={() => handleEditDelete({ any: 'done', _id, nimage, nitem, nquantity, nprice, ndetail })}>Done</button>}</div>
    </Container>)
}
export default InputPage;