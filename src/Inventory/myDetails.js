import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyDetails = ({ handle_Changes, handleMyDetails, handleUserLogged }) => {
    let [email, setEmail] = useState('')
    let [conEmail, setConEmail] = useState('')
    let [epassword, setEpassword] = useState('');
    let [newPassword, setNpassword] = useState('')
    let [conPassword, setConpassword] = useState('')
    let [alterNumber, setAltNumber] = useState('')
    let [inputErrStyle, setIES] = useState({})
    const navigate = useNavigate()
    let myDetails = useSelector(state => state.personalDetails)
    let [title, setTitle] = useState(myDetails.title)
    let [firstName, setFirstName] = useState(myDetails.firstName)
    let [lastName, setLastName] = useState(myDetails.lastName)
    let [mobNumber, SetmobNumber] = useState(`+44 ${myDetails.mobNumber} `)
    let style = {
        errorStyle: { border: '2px solid red' },
        save: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', width: '70%', borderRadius: '2px', border: 'none' },
        cancel: { color: 'white', backgroundColor: 'gray', width: '70%', border: 'none', fontWeight: 'bold', borderRadius: '2px' },
        address: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', borderRadius: '2px', border: 'none' }
    }

    let userLogged = useSelector(state => state.userLoggedIn)

    useEffect(() => {
        if (!myDetails) {
            handleMyDetails();
        }

        if (!userLogged) {
            navigate('/signup')
        }
    }, [userLogged, myDetails]);

    const handleChanges = () => {
        if (epassword && email === conEmail && newPassword === conPassword && alterNumber) {
            handle_Changes({ any: 'details', title, firstName, lastName, email, epassword, newPassword, mobNumber, alterNumber })
            setAltNumber('')
            setConpassword('')
            setConEmail('')
            setNpassword('')
            setEpassword('')
            setEmail('')
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

        <Row className='centered-row'>
            <Col className='centered-text' lg={5} md={6} sm={12} xs={12}>
                <span className='header-title'>Personal Information</span>
                <p className='info-text'>Review and modify your personal account details here.</p>
                <p className='info-text'>For security, we'll require your password to confirm any modifications.</p>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col className='bg-white d-flex justify-content-center py-3 my-5' lg={10} md={10} sm={12} xs={12}>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <div className='input-section'>
                        <label className='d-block my-2 mx-1 input-label' htmlFor="title">Title</label>
                        <select onChange={(event) => setTitle(event.target.value)} value={title} name="title" id="title" style={{ width: '40%' }} className='personalInput'>
                            <option value="">Select</option>
                            <option value="Mx">Mx</option>
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
                        <input value={firstName} onInput={(event) => setFirstName(event.target.value)} id='firstName' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='lastName'>Last Name</label>
                        <input value={lastName} onInput={(event) => setLastName(event.target.value)} id='lastName' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <span className='input-label'>Existing email address</span>
                        <span className='d-block'>{myDetails.email}</span>
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='email'>Email Address</label>
                        <input style={inputErrStyle.errorStyle} type='email' onInput={(event) => setEmail(event.target.value)} id='email' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='conemail'>Confrim Email Address</label>
                        <input style={inputErrStyle.errorStyle} type='email' onInput={(event) => setConEmail(event.target.value)} id='conemail' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='epassword'>Existing password <span style={{ fontWeight: 'lighter' }}>(required for changes)</span></label>
                        <input style={inputErrStyle.errorStyle} type='password' onInput={(event) => setEpassword(event.target.value)} id='epassword' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='npassword'>New Password</label>
                        <input style={inputErrStyle.errorStyle} type='password' onInput={(event) => setNpassword(event.target.value)} id='npassword' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='conpassword'>Confrim New Password</label>
                        <input style={inputErrStyle.errorStyle} type='password' onInput={(event) => setConpassword(event.target.value)} id='conpassword' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='mobNumber'>Mobile Number</label>
                        <input style={inputErrStyle.errorStyle} value={mobNumber} onInput={(event) => SetmobNumber(event.target.value)} id='mobNumber' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='altNum'>Alternate Number<span style={{ fontWeight: 'lighter' }}>(optional)</span></label>
                        <input style={inputErrStyle.errorStyle} onInput={(event) => setAltNumber(event.target.value)} id='altNum' className='w-100 personalInput' />
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
export default MyDetails