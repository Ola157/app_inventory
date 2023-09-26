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

    return (<Container>
        <div className='product-header'>
            Product
        </div>
        <hr className='product-divider' />
        {/* <div>{itemEdit ? < img className='h-10 w-100 img' src={`http://localhost:9810/${image}`} /> : <input className='border rounded text-center' type='file' onChange={setImage} />} </div> */}
        {/* <hr className='w-100 my-0'></hr> */}
        <div className='product-field'>
            {itemEdit ? item : <input className='product-input' placeholder='Item Name' onInput={(event) => setItem(event.target.value)} />}
        </div>
        <hr className='product-divider' />

        <div className='product-field'>
            {itemEdit ? quantity : <input className='product-input' placeholder='Quantity' onInput={(event) => setQty(event.target.value)} />}
        </div>
        <hr className='product-divider' />

        <div className='product-field'>
            {itemEdit ? <>${price}</> : <input className='product-input' placeholder='Price' onInput={(event) => setPrice(event.target.value)} />}
        </div>
        <hr className='product-divider' />

        <div className='product-field'>
            {itemEdit ? detail : <input className='product-input' placeholder='Description' onInput={(event) => setDetail(event.target.value)} />}
        </div>
        <hr className='product-divider' />

        <div className='product-actions'>
            <button className='btn-delete' onClick={() => handleEditDelete({ any: 'remove', _id })}> Delete</button>
            {itemEdit
                ? <button className='btn-edit' onClick={() => handleEditDelete({ any: 'edit', _id })}>Edit</button>
                : <button className='btn-done' onClick={() => handleEditDelete({ any: 'done', _id, nimage, nitem, nquantity, nprice, ndetail })}>Done</button>
            }
        </div>
    </Container>)
}
export default InputPage;