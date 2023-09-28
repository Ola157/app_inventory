import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyAddress = ({ handle_Changes, handleMyAddress, handleAmends, handleUserLogged }) => {
    let [title, setTitle] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [buildname, setBuildName] = useState('')
    let [buildNum, setBuildNum] = useState('')
    let [flatNum, setFlatNum] = useState('')
    let [street, setStreet] = useState('')
    let [townStreet, setTownStreet] = useState('')
    let [county, setCounty] = useState('')
    let [addressNick, setAddressNick] = useState('')
    let [delInstruct, setDeliveryInstruction] = useState('')
    let [inputErrStyle, setIES] = useState({})
    let myAddress = useSelector(state => state.address)
    let [showAddress, setShowAdd] = useState(false)
    let [id, setId] = useState('')
    let style = {
        errorStyle: { border: '2px solid red' },
        cancel: { color: 'white', backgroundColor: 'gray', width: '70%', border: 'none', fontWeight: 'bold', borderRadius: '2px' },
    }
    const navigate = useNavigate('')
    let userLogged = useSelector(state => state.userLoggedIn)

    useEffect(() => {
        if (!myAddress.length) {
            handleMyAddress()
        }

        if (!userLogged) {
            navigate('/signup')
        }
    }, [userLogged, myAddress]);


    const handleChanges = (type, addressId) => {
        if (type === 'add', firstName && lastName && buildNum || buildname && flatNum && street && townStreet && county && addressNick) {
            handle_Changes({ any: 'address', title, firstName, lastName, buildNum, buildname, flatNum, street, townStreet, county, addressNick, delInstruct, id })
            return setShowAdd(false)
        }

        if (type === 'cancel') {
            setShowAdd(false)
            return handleAmends(type)
        }

        if (type === 'edit') {
            setShowAdd(true)
            setId(addressId)
            return handleAmends(type, addressId)
        }

        if (type === 'delete') {
            return handleAmends(type, addressId)
        }

        else {
            setIES({ ...inputErrStyle, errorStyle: style.errorStyle })
            setTimeout(() => { setIES({}) }, 2000)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
        navigate('/')
    }

    return (<Container fluid className='inventory'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end text-white mx-0 me-0 w-100'>
                <button
                    className='inventory__navbar-btn'
                    onClick={userLogged ? () => handleLogout() : () => navigate("/signIn")}
                >
                    {userLogged ? 'Logout' : 'Login/register'}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                <button className='trolley-title-btn' onClick={() => navigate('/')}>
                    Express
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='back-col'>
                <button onClick={() => navigate('/useraccount')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>My Account</span>
                </button>
            </Col>
        </Row>

        < Row className='d-flex justify-content-center'>
            <Col className='text-center'>
                <span className='header-title'>My Address</span>
                <span className='my-2 d-block'>{!myAddress.length ? 'You do not have any saved addresses.' : "Here's where you can edit, add or delete your delivery and billing addresses"}
                </span>
                {!showAddress && (
                    <div className='d-flex justify-content-center'>
                        <button className='action-btn' onClick={() => setShowAdd(true)}>Add a new address</button>
                    </div>)}
            </Col>
        </Row>


        {showAddress ?
            <Row className='d-flex justify-content-center pt-0 bg-white'>
                <Col className='d-flex justify-content-center py-3 mb-5' lg={10} md={10} sm={12} xs={12}>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <div className='input-section'>
                            <label className='input-label' htmlFor="title">Title</label>

                            <select style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onChange={(event) => setTitle(event.target.value)} name="title" id="title" className='personalInput w-50'>
                                <option value="">Select</option>
                                <option value="Mr">Mx</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Mr">Mr</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                                <option value="Capt">Capt</option>
                                <option value="Sir">Sir</option>
                            </select>
                        </div>

                        <div className='input-section'>
                            <label className='input-label' htmlFor='firstName'>First Name</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setFirstName(event.target.value)} className='personalInput w-100' id='firstName' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='lastName'>Last Name</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setLastName(event.target.value)} className='personalInput w-100' id='lastName' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='buildName'>Building Name</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setBuildName(event.target.value)} className='personalInput w-100' id='buildName' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='buildNumber'>Or building number</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setBuildNum(event.target.value)} className='personalInput w-100' id='buildNumber' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='flatNumber'>Flat number <span style={{ fontWeight: 'lighter' }}>(if relevant)</span></label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setFlatNum(event.target.value)} className='personalInput w-100' id='flatNumber' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='street'>Street</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setStreet(event.target.value)} className='personalInput w-100' id='street' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='townStreet'>Town or Street</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setTownStreet(event.target.value)} className='personalInput w-100' id='townStreet' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='county'>County <span style={{ fontWeight: 'lighter' }}>(optional)</span></label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setCounty(event.target.value)} className='personalInput w-100' id='county' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='addressNick'>Address nickname</label>
                            <p style={{ fontSize: '.8em' }}>Give this address a nickname - it'll make it easier to pick out when you have more than one.</p>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setAddressNick(event.target.value)} className='personalInput w-100' id='addressNick' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='delInstruct'>Delivery instructions <span style={{ fontWeight: 'lighter' }}>(optional) </span></label>
                            <p style={{ fontSize: '.8em' }}>Enter useful information about your delivery address to help your delivery driver get your order to the right place. E.g. Use side door</p>
                            <textarea onInput={(event) => setDeliveryInstruction(event.target.value)} id='delInstruct' style={{ width: '100%', height: '6em', borderRadius: '2px' }}></textarea>
                        </div>

                        <div className='centered-button-section'>
                            <button className='action-button save-button' onClick={() => handleChanges()}>Save</button>
                        </div>

                        <div className='centered-button-section'>
                            <button className='action-button cancel-button' onClick={() => navigate('/useraccount')}>Cancel</button>
                        </div>
                    </Col>
                </Col>
            </Row>
            : null}

        {!showAddress &&
            <Row className='d-flex justify-content-center'>
                {Array.isArray(myAddress) &&
                    myAddress.map((myaddy, index) =>
                        <Col key={index} lg={4} md={8} sm={12} xs={12} className='bg-white p-3 m-1'>
                            <div style={{ fontSize: 'larger', fontWeight: '900' }}>flat {myaddy.flatNum}, {myaddy.street} </div>
                            <div>{myaddy.title}  {myaddy.firstName}  {myaddy.lastName} </div>
                            <div>flat {myaddy.flatNum}</div>
                            <div>{myaddy.buildname} {myaddy.buildNum}</div>
                            <div>{myaddy.street}</div>
                            <div>{myaddy.townStreet} </div>
                            <div>{myaddy.county} </div>
                            <div> {myaddy.addressNick} </div>
                            <div> {myaddy.delInstruct} </div>
                            <div className='d-flex justify-content-between align-items-baseline'>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <button className='py-0 my-2 border-0 bg-transparent addressButton d-flex justify-content-between align-items-center'
                                        onClick={() => handleChanges('edit', myaddy._id)}>
                                        <GrEdit className='pe-1' style={{ fontSize: '1.7em' }} />
                                        <span className='px-1'>Edit</span>
                                    </button >
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}><button className='py-0 m-1 border-0 bg-transparent addressButton d-flex justify-content-between align-items-center'
                                    onClick={() => handleChanges('delete', myaddy._id)}>
                                    <RiDeleteBin6Line className='pe-1' style={{ fontSize: '1.7em' }} />
                                    <span className='px-1'>Delete</span></button>
                                </Col>
                            </div>
                        </Col >)}
            </Row >
        }
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
export default MyAddress