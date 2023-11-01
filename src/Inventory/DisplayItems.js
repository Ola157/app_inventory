import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
const InputPage = ({ each: { item, quantity, price, description, image, editItem, _id, }, index, handleProductAmends, handleFetch }) => {
    let [newItem, setNewItem] = useState('')
    let [newQuantity, setNewQty] = useState('')
    let [newPrice, setNewPrice] = useState('')
    let [newDescription, setNewDescription] = useState('')
    let [newImage, setNewImage] = useState('')

    const setImage = e => {
        setNewImage(e.target.files[0])
    }

    const handleChanges = (type) => {
        let data = { type, _id, newImage, newItem, newQuantity, newPrice, newDescription }
        handleProductAmends(data);
        handleFetch()
    };


    return (<Container>
        <div className='product-header'>
            Product
        </div>
        <hr className='product-divider' />

        {!editItem ? <div className='item-image'>
            <img src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/inventory/${image}`} />
        </div>
            :
            <>
                <input id='newimage' className='product-input d-none' type='file' placeholder='image' onChange={setImage} />
                <label className='image-label' htmlFor='newimage'>{!newImage ? 'Select Image' : newImage.name}</label>
            </>
        }

        <hr className='product-divider' />


        <div className='product-field'>
            {!editItem ? item :
                <input className='product-input' placeholder='Item Name' onInput={(event) => setNewItem(event.target.value)} />}
        </div>
        <hr className='product-divider' />

        <div className='product-field'>
            {!editItem ? quantity : <input className='product-input' placeholder='Quantity' onInput={(event) => setNewQty(event.target.value)} />}
        </div>
        <hr className='product-divider' />

        <div className='product-field'>
            {!editItem ? <>${price}</> : <input className='product-input' placeholder='Price' onInput={(event) => setNewPrice(event.target.value)} />}
        </div>
        <hr className='product-divider' />

        <div className='product-field'>
            {!editItem ? description : <input className='product-input' placeholder='newDescription' onInput={(event) => setNewDescription(event.target.value)} />}
        </div>
        <hr className='product-divider' />


        {
            !editItem
                ?
                <div className='product-actions'>
                    <button className='btn-edit' onClick={() => handleChanges('edit')}>Edit</button>
                    <button className='btn-delete' onClick={() => handleChanges('delete')}> Delete</button>
                </div>
                :
                <div className='product-actions'>
                    <button className='btn-save' onClick={() => handleChanges('save')}>Save</button>
                    <button className='btn-cancel' onClick={() => handleChanges('cancel')}>Cancel</button>
                </div>
        }

    </Container >)
}
export default InputPage;