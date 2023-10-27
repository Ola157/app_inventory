import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PiArrowSquareLeftFill } from 'react-icons/pi'

const RegistrationPage = ({ handleAuthentication, handleAddClick, handleIncomingMessage, handleNavigation, handleIsRegister }) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [title, setTitle] = useState('')
    let [mobileNumber, setMobileNumber] = useState('')
    const isLogged = useSelector(state => state.isLogged)
    const { page, itemId, userQuantity } = useParams()
    const message = useSelector(state => state.message)
    const isClickRegister = useSelector(state => state.isClickRegister)

    useEffect(() => {
        homePageReturn();
    }, [isLogged])

    const homePageReturn = () => {
        if (!isLogged) {
            return;
        }
        if (page === 'viewmore') {
            handleNavigation(`/viewmore/${itemId}`);
            handleAddClick(itemId, userQuantity);
        } else if (page === 'viewmore') {
            handleNavigation(`/viewmore/${itemId}`);
        } else if (page === 'homepage') {
            handleAddClick(itemId, userQuantity);
            handleNavigation('/');
        } else if (page === 'homepage') {
            handleNavigation('/');
        }
    };

    const handleAuth = (type) => {
        if (email && password) {
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setTitle('')
            setMobileNumber('')
            return handleAuthentication({ type, email, title, password, firstName, lastName, mobileNumber })
        }
        else {
            handleIncomingMessage('inputs cant be blank')
        }
    }

    return (<Container fluid className='inventory'>
        <Navbar expand="lg" className='navbar'>
            <Col lg={12} className='d-flex justify-content-start navbar-col'>
                <button className='navbar-button' onClick={() => handleNavigation('/')}>
                    <h2>Express</h2>
                </button>
            </Col>
        </Navbar>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>Homepage</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center'>
            <Col lg={4} className='form-col'>
                {message && (<>
                    <Row className="modal-alert">
                        <Col className="modal-content" lg={8} md={5} sm={6} xs={8}>
                            <div>{message}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='messagebtn'>
                            {message === 'User already exists' && <button onClick={() => handleIsRegister(false)}>Click to sign in</button>}
                        </Col>
                    </Row>
                </>)}

                <Row className='justify-content-start header-row'>
                    <Col className='description'>
                        {!isClickRegister ? 'Log In' : 'Register'}
                    </Col>
                </Row>

                <Row className='justify-content-center inputs-row'>
                    <Col className='form-inputs'>
                        {isClickRegister && (
                            <>
                                <Row className='d-flex justify-content-around align-items-center'>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>First Name</label>
                                        <input value={firstName} className='input-field h-100' onInput={event => setFirstName(event.target.value)} />
                                    </Col>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>Last Name</label>
                                        <input value={lastName} className='input-field h-100' onInput={event => setLastName(event.target.value)} />
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around align-items-center'>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>Title</label>
                                        <select value={title} className='input-field h-100' onInput={event => setTitle(event.target.value)}>
                                            <option value="">Select</option>
                                            <option value="mr">Mr</option>
                                            <option value="mr">Mrs</option>
                                            <option value="mr">Miss</option>
                                            <option value="mr">Ms</option>
                                        </select>
                                    </Col>
                                    <Col lg={5} md={5} sm={10} xs={10}>
                                        <label className='d-block input-label'>Mobile Number</label>
                                        <input value={mobileNumber} className='input-field h-100' onInput={event => setMobileNumber(event.target.value)} />
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
                                <button className='submit-button' onClick={() => handleAuth(!isClickRegister ? 'login' : 'signup')}>
                                    {!isClickRegister ? 'Log In' : 'Register'}
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {!isClickRegister && (
                    <Row className='signup-prompt'>
                        <Col>
                            <Col className='prompt-text'>New To Super Groceries?</Col>
                            <Col className='action-text'>
                                <button className='signup-button' onClick={() => handleIsRegister(true)}>Register Here</button>
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