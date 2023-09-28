import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const RegistrationPage = ({ handleLogin_SignUp, handle_Modal, handleCart, handleItemModal }) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [title, setTitle] = useState('')
    let [mobNumber, setMobNum] = useState('')
    let [isLogin, setIsLogin] = useState(true)
    let userLogged = useSelector(state => state.userLoggedIn)
    let modal = useSelector(state => state.modal)
    let navigate = useNavigate()
    const { page, itemId } = useParams()
    let products = useSelector(state => state.allGoods)

    useEffect(() => {
        const homePageReturn = () => {
            if (userLogged === true) {
                handle_Modal()
                if (page === 'viewmore') {
                    navigate(`/viewmore/${itemId}`)
                }
                else {
                    let checkItemQty = products.find(item => item._id === itemId)
                    let { quantity } = checkItemQty
                    if (quantity <= 1) {
                        handleItemModal('Out of Stock, Item to be replenished soon')
                        return navigate('/')
                    }
                    else {
                        handleCart(page, itemId)
                        return navigate('/')
                    }
                }
            }

            if (userLogged === "Registered") {
                handle_Modal()
                setIsLogin(true)
            }
        }
        homePageReturn();

    }, [userLogged, modal, isLogin])

    const handleRegistration = (type) => {
        if (email && password) {
            setEmail('')
            setPassword('')
            return handleLogin_SignUp({ type, email, title, password, firstName, lastName, mobNumber })
        }
        else {
            alert('inputs cant be blank')
        }
    }

    return (<Container fluid className='inventory'>
        <Navbar expand="lg" className='navbar'>
            <Col lg={12} className='d-flex justify-content-start navbar-col'>
                <button className='navbar-button' onClick={() => navigate('/')}>
                    <h2>Express</h2>
                </button>
            </Col>
        </Navbar>

        <Row className='justify-content-center'>
            <Col lg={4} className='form-col'>
                {modal && (
                    <Row className="modal-alert">
                        <Col className="modal-content" lg={8} md={5} sm={6} xs={8}>
                            <div>{modal}</div>
                        </Col>
                    </Row>
                )}

                <Row className='justify-content-start header-row'>
                    <Col className='description'>
                        {isLogin ? 'Log In' : 'Register'}
                    </Col>
                </Row>

                <Row className='justify-content-center inputs-row'>
                    <Col className='form-inputs'>
                        {!isLogin && (
                            <>
                                <Row className='d-flex justify-content-around align-items-center'>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>First Name</label>
                                        <input className='input-field h-100' onInput={event => setFirstName(event.target.value)} />
                                    </Col>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>Last Name</label>
                                        <input className='input-field h-100' onInput={event => setLastName(event.target.value)} />
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around align-items-center'>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>Title</label>
                                        <select className='input-field h-100' onInput={event => setTitle(event.target.value)}>
                                            <option value="">Select</option>
                                            <option value="mr">Mr</option>
                                        </select>
                                    </Col>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>Mobile Number</label>
                                        <input className='input-field h-100' onInput={event => setMobNum(event.target.value)} />
                                    </Col>
                                </Row>
                            </>
                        )}

                        <Row className='d-flex justify-content-center'>
                            <Col lg={10} md={10} sm={10} xs={10}>
                                <label htmlFor='email' className='input-label'>Email</label>
                                <input id='email' className='input-field' value={email} onInput={event => setEmail(event.target.value)} type='email' />
                            </Col>
                            <Col lg={10} md={10} sm={10} xs={10}>
                                <label htmlFor='password' className='input-label'>Password</label>
                                <input className='input-field' id='password' value={password} onInput={event => setPassword(event.target.value)} type='password' />
                            </Col>
                            <Col lg={10} md={10} sm={10} xs={10} className='text-center'>
                                <button className='submit-button' onClick={() => handleRegistration(isLogin ? 'login' : 'signup')}>
                                    {isLogin ? 'Log In' : 'Register'}
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {isLogin && (
                    <Row className='signup-prompt'>
                        <Col>
                            <Col className='prompt-text'>New To Super Groceries?</Col>
                            <Col className='action-text'>
                                <button className='signup-button' onClick={() => setIsLogin(false)}>Register Here</button>
                            </Col>
                        </Col>
                    </Row>
                )}
            </Col>
        </Row >
        <footer className="inventory__footer">
            <Container>
                <Row>
                    <Col lg={12} className='text-center'>
                        <p className="inventory__footer-text">
                            &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container >)
}
export default RegistrationPage