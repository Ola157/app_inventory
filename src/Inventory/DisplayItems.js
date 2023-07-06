import React, { useState } from 'react'
import { Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap'
const InputPage = ({ each: { item, quantity, price, detail, image, editAdd, id }, index, handleRem }) => {
    let [nitem, setItem] = useState('')
    let [nquantity, setQty] = useState('')
    let [nprice, setPrice] = useState('')
    let [ndetail, setDetail] = useState('')

    return (<Container className='pb-5 px-0 pe-0 display'>
        Product {index + 1}
        <hr className='w-100 my-0'></hr>
        < img className='h-10 w-100' src={require(`./assets/imgs/${image}`)} />
        <hr className='w-100 my-0'></hr>
        <div> {editAdd !== 'edit' ? item : <input className='border rounded text-center' onInput={(event) => setItem(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div> {editAdd !== 'edit' ? quantity : <input className='border rounded text-center' onInput={(event) => setQty(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div> {editAdd !== 'edit' ? <>${price}</> : <input className='border rounded text-center' onInput={(event) => setPrice(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div> {editAdd !== 'edit' ? detail : <input className='border rounded text-center' onInput={(event) => setDetail(event.target.value)} />}</div>
        <hr className='w-100 my-1'></hr>
        <div><button className='border rounded py-0 m-1 btnDis' onClick={() => handleRem('rem', id)}> Delete</button >{editAdd !== 'edit' ? <button className='border rounded py-0 m-1 btnDis' onClick={() => handleRem('edit', id)}>Edit</button> : <button className='border rounded py-0 m-1 btnDis' onClick={() => handleRem('done', id, nitem, nquantity, nprice, ndetail)}>Done</button>}</div>
    </Container>)
}
export default InputPage;