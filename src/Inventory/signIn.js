import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PiWarningOctagonFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";



const RegistrationPage = ({ handleLogin_SignUp, handle_Modal }) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [title, setTitle] = useState('')
    let [mobNumber, setMobNum] = useState('')
    let [boo, handleBoo] = useState(true)
    let userLogged = useSelector(state => state.userLoggedIn)
    let modal = useSelector(state => state.modal)
    let navigate = useNavigate()
    let style = {
        color: 'blueviolet'
    }

    useEffect(() => {
        const homePageReturn = () => {
            if (userLogged === true) {
                navigate('/')
            }

            if (userLogged === "Registered") {
                handleBoo(true)
            }
        }
        homePageReturn();

    }, [userLogged, modal])



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

    return (<Container fluid className='signInpage'>
        <Navbar expand="lg" className='navbar'>

        </Navbar>

        < Row className='d-flex justify-content-center' >
            <Col lg={4} md={4} sm={12} xs={12} className='my-2'>

                {modal &&
                    <Row >
                        <Col className="d-flex justify-content-between align-items-baseline bg-white mx-2 me-2 py-3">
                            <span><PiWarningOctagonFill style={{ color: 'red' }} /></span>
                            <div style={style}>{modal}</div>
                            <button className="border-0 bg-transparent" onClick={handle_Modal} aria-label="Close">
                                <span aria-hidden="true"><MdCancel /></span>
                            </button>
                        </Col>
                    </Row>
                }

                <Row className='d-flex justify-content-start my-3'>

                    <Col className='description'>{boo ? 'Log In' : 'Register'}</Col>
                </Row >

                <Row className='d-flex justify-content-center mb-5'>
                    <Col className='mx-2 me-2 py-2 border inputContainer border-0 d-flex justify-content-center align-items-center'>

                        <Col >
                            {!boo && <><Col className='d-flex justify-content-between align-items-center m-1'>
                                <Col lg={5} md={5} sm={12} xs={12}>
                                    <label className='d-block my-1 label'>First Name</label>
                                    <input className='w-100 name' onInput={(event) => setFirstName(event.target.value)} />
                                </Col>
                                <Col lg={5} md={5} sm={12} xs={12}>
                                    <label className='d-block my-1 label'>Last Name</label>
                                    <input className='w-100 name' onInput={(event) => setLastName(event.target.value)} />
                                </Col>
                            </Col>

                                <Col className='d-flex justify-content-between align-items-center m-1'>
                                    <Col lg={5} md={5} sm={12} xs={12}>
                                        <label className='d-block my-1 label'>Title</label>
                                        <select className='w-100 name' onInput={(event) => setTitle(event.target.value)} >
                                            <option value="">Select</option>
                                            <option value="mr">Mr</option>
                                            <option value="mrs">Mrs</option>
                                            <option value="mr">Mr</option>
                                            <option value="miss">Miss</option>
                                            <option value="ms">Ms</option>
                                            <option value="capt">Capt</option>
                                            <option value="sir">Sir</option>
                                        </select>
                                    </Col>
                                    <Col lg={5} md={5} sm={12} xs={12}>
                                        <label className='d-block my-1 label'>Mobile Number</label>
                                        <input className='w-100 name' onInput={(event) => setMobNum(event.target.value)} />
                                    </Col>
                                </Col></>}
                            <Col className='text-center m-1'>
                                <div className='text-start my-1 label'><label htmlFor='email'>Email address</label></div>
                                <div> <input id='email' className='input text-center w-100' value={email} onInput={(event) => setEmail(event.target.value)} type='email' /></div>
                            </Col>

                            <Col className='text-center m-1'>
                                <div className='text-start my-1 label'><label htmlFor='password'>Password</label></div>
                                <input className='input text-center w-100' id='password' value={password} onInput={(event) => setPassword(event.target.value)} type='password' />
                            </Col>

                            <Col className='text-center m-1 my-2'> <button className='border-0 text-center text-white loginButton' onClick={boo ? () => handleRegistration('login') : () => handleRegistration('signup')}>{boo ? 'Log In' : 'Register'}</button></Col>

                        </Col>
                    </Col>
                </Row >

                {boo ?
                    <Row className='d-flex justify-content-center my-3'>
                        <Col>
                            <Col className='w-100 text-center my-2'>New To Super Groceries?</Col>
                            <Col className='text-center w-100 my-2'><button className='text-center py-2 regButton' onClick={() => handleBoo(false)}>Register Here</button></Col>
                        </Col>
                    </Row>
                    : ''}

            </Col >
        </Row >

    </Container >)
}
export default RegistrationPage