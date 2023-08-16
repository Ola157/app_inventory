import React, { useEffect, useState } from 'react';
import DisplayItems from './DisplayItems';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';

const AdminPage = ({ handleAddItem, handleEditDelete }) => {
    let [item, setItem] = useState('');
    let [quantity, setQty] = useState('');
    let [price, setPrice] = useState('');
    let [image, setImage] = useState('');
    let [detail, setDetail] = useState('');
    let [img, setImg] = useState('')
    let [products, setProducts] = useState('')
    const navigate = useNavigate('')

    useEffect(() => {
        const handleFetch = async () => {
            try {
                let response = await axios.get('https://inventory-be-seven.vercel.app/store/getAllgoods', null)
                let { allGoods } = response.data
                setProducts(allGoods)
            }
            catch (err) {
                console.log(err)
            }
        }
        handleFetch()
    })

    const selectImage = e => {
        setImage(e.target.files[0])
        setImg('')
    }

    const handleAdd = async () => {
        handleAddItem({ item, quantity, image, price, detail })
        setDetail('')
        setItem('')
        setPrice('')
        setImage('')
        setQty('')
    }

    return (
        <Container fluid className='display pb-5'>

            <Navbar expand="lg" className='navbar'>
                <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                    <button className='border-0 bg-transparent' onClick={() => navigate('/')}>
                        <h2 style={{ color: 'blueviolet' }}>Express</h2>
                    </button>
                </Col>
            </Navbar>

            <Row>
                <Col lg={12} md={12} sm={12} xs={12} className='text-start'>
                    <Link to='/' className='d-flex justify-content-start align-items-center' style={{ textDecoration: 'none', color: 'black' }}><BiArrowBack className='m-1' />Back</Link>
                </Col>
                <Col><hr className='m-1 line'></hr></Col>
            </Row>
            <Row className='my-2 m-1 d-flex justify-content-evenly align-items-center border-1 border-black'>
                <Col lg={2} md={3} sm={3} xs={4}>
                    <input className='border rounded m-1 text-center w-100' value={item} placeholder='Item Name' onInput={event => setItem(event.target.value)} />
                </Col>
                <Col lg={2} md={3} sm={3} xs={4}>
                    <input className='border rounded m-1 text-center w-100' value={quantity} placeholder='Quantity' onInput={event => setQty(Number(event.target.value))} />
                </Col>
                <Col lg={2} md={3} sm={3} xs={4}>
                    <input className='border rounded m-1 text-center w-100' value={price} placeholder='Price' onInput={event => setPrice(Number(event.target.value))} />
                </Col>
                <Col lg={2} md={3} sm={3} xs={4}>
                    <input className='border rounded m-1 text-center w-100' value={detail} placeholder='Description' onInput={event => setDetail(event.target.value)} />
                </Col>
                <Col lg={2} md={3} sm={3} xs={4} className='text-center'>
                    <input className='border rounded m-1 text-center w-100' type='file' value={img} onChange={selectImage} />
                </Col>
                <Col lg={2} md={3} sm={3} xs={4} className='text-center'>
                    <button className='border rounded m-1 text-center' onClick={() => handleAdd()}>ADD</button>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}><hr className='m-1 line'></hr></Col>
            </Row>

            {products ?
                <Row className='d-flex justify-content-evenly m-1'>
                    {products.map((each, index) => (<Col lg={2} md={3} sm={6} xs={12} className='border rounded text-center px-0 pe-0 m-1' key={index}>
                        <DisplayItems key={index} each={each} index={index} handleEditDelete={handleEditDelete} />
                    </Col>
                    ))}
                </Row >
                : ''}
        </Container >
    )
}
export default AdminPage;